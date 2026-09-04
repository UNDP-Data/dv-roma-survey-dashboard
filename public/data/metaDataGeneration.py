"""
    python3 metaDataGeneration.py input.csv output.json
"""

import csv
import json
import sys


AVAILABLE_DISAGGREGATIONS = [
    "age",
    "sex",
    "urbanization",
    "education",
    "employment",
    "householdSize",
    "childrenInHousehold",
]


def convert(input_csv: str, output_json: str) -> None:
    records = []

    # utf-8-sig handles the BOM at the start of the file (seen before "slug")
    with open(input_csv, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)

        for row in reader:
            record = {
                "id": row.get("slug", "").strip(),
                "title": row.get("title", "").strip(),
                "category": row.get("domain", "").strip(),
                "subCategory": row.get("theme", "").strip(),
                "source": row.get("source", "").strip(),
                "calculationTypeForDisaggregation": {
                    "sex": row.get("sex_age_of", "").strip(),
                    "age": row.get("sex_age_of", "").strip(),
                    "education": row.get("edu_emp_of", "").strip(),
                    "employment": row.get("edu_emp_of", "").strip(),
                },
                "valueType": "percentage",
                "availableDisaggregations": AVAILABLE_DISAGGREGATIONS,
            }
            records.append(record)

    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=2, ensure_ascii=False)

    print(f"Converted {len(records)} rows -> {output_json}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 csv_to_json.py <input.csv> <output.json>")
        sys.exit(1)

    convert(sys.argv[1], sys.argv[2])
