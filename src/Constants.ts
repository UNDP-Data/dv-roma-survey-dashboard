export const COUNTRIES = [
  { id: 'georgia', name: 'Georgia' },
  { id: 'moldova', name: 'Moldova' },
  { id: 'ukraine', name: 'Ukraine' },
];

export const COLORS = ['var(--accent-red)', 'var(--accent-violet)'];
export const GROUPS = ['Roma', 'non-Roma'];

export const FEATURED_INDICATORS = {
  'work and employment': [
    'wb_neet_15_24',
    'wb_unemployed_15_64',
    'wb_informal_employment_employed_15_64',
    'household_had_self_employment_income',
  ],
  discrimination: [
    'wb_past_year_discrimination_ethnicity_skin_colou',
    'fra_dis12atwork',
    'fra_dis12lkwork',
    'fra_dis12health',
    'fra_dis12eduinst',
    'wb_any_past_year_discrimination_any_ground',
    'wb_no_documentation_no_valid_id_or_passport',
  ],
  education: [
    'completed_secondary_education_ages_18_65',
    'school_attendance_ages_6_15',
    'child_enrolled_in_daycare',
    'fra_hch05b2',
    'fra_early_leaver',
  ],
  health: [
    'wb_no_medical_insurance',
    'wb_bad_or_very_bad_self_rated_health',
    'health_access_unmet_medical_need',
    'health_service_quality',
    'environmental_health_consequences',
  ],
  'living conditions': [
    'severe_material_and_social_deprivation_lacking_7',
    'food_insecurity',
    'overcrowding',
    'indoor_toilet_companion',
    'makes_ends_meet_with_difficulty',
    'acceptance_as_neighbours',
    'women_have_money_of_their_own',
  ],
};
