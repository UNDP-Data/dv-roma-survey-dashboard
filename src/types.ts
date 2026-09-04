export type Disaggregation =
  | 'none'
  | 'sex'
  | 'age group'
  | 'urbanisation'
  | 'education'
  | 'employment status'
  | 'household size'
  | 'children in household'
  | 'age (wb)';

interface BaseRow {
  disaggregation: Disaggregation;
  category: string;
  noOfRespondents: number;
}

export interface PercentageRow extends BaseRow {
  yesPercent: number;
  noPercent: number;
  mean?: never;
  gapPp?: never;
}

export interface MeanRow extends BaseRow {
  mean: number;
  yesPercent?: never;
  noPercent?: never;
  gapPp?: never;
}

export interface GapRow extends BaseRow {
  gapPp: number;
  yesPercent?: never;
  noPercent?: never;
  mean?: never;
}

export type DisaggregationRow = PercentageRow | MeanRow | GapRow;

export interface SurveyIndicator {
  id: string;
  description: string;
  metaData: string;
  noOfRespondents: number;
  roma: DisaggregationRow[];
  nonRoma: DisaggregationRow[];
}

export interface OptionType {
  label: string;
  value: string;
}

export interface IndicatorMetaData {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  source: string;
  valueType: string;
  calculationTypeForDisaggregation: Record<string, string>;
  availableDisaggregations: string[];
}
