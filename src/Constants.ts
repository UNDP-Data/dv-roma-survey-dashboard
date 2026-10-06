export const COUNTRIES = [
  { id: 'georgia', name: 'Georgia', isoCode: 'GEO' },
  { id: 'moldova', name: 'Moldova', isoCode: 'MDA' },
  { id: 'ukraine', name: 'Ukraine', isoCode: 'UKR' },
];

export const COLORS = ['var(--accent-red)', 'var(--accent-violet)'];
export const GROUPS = ['Roma', 'non-Roma'];

export const THEMES = [
  {
    name: 'Education',
    description:
      'Gaps in education span the learning cycle and adulthood, leaving a trace along the life course',
    id: 'education',
  },
  {
    name: 'Employment',
    description: 'Finding work does not ensure a secure livelihood',
    id: 'employment',
  },
  {
    name: 'Housing',
    description: 'Having a roof does not ensure adequate space, sanitation or warmth.',
    id: 'housing',
  },
  {
    name: 'Health',
    description: 'Poor health constrains opportunities for many Roma during their working years',
    id: 'health',
  },
  {
    name: 'Discrimination',
    description:
      'Unequal treatment and administrative barriers restrict access to opportunities and support',
    id: 'discrimination',
  },
];

export const FEATURED_INDICATORS = {
  'work and employment': [
    'wb_unemployed_15_64',
    'wb_employed_25_64',
    'wb_informal_employment_employed_15_64',
    'wb_inactive_15_64',
    'unemployment_and_seasonal_occasional_employment',
    'wb_neet_15_24',
  ],
  discrimination: [
    'wb_no_documentation_no_valid_id_or_passport',
    'wb_any_past_year_discrimination_any_ground',
    'wb_past_year_discrimination_ethnicity_skin_colou',
    'fra_dis12health',
    'fra_dis12lkwork',
    'fra_dis12atwork',
    'fra_dis12eduinst',
  ],
  education: [
    'completed_secondary_education_ages_18_65',
    'school_attendance_ages_6_15',
    'child_enrolled_in_daycare',
    'preschool_education',
    'fra_hch05b2',
    'fra_early_leaver',
    'fra_edutert',
  ],
  health: [
    'wb_no_medical_insurance',
    'wb_bad_or_very_bad_self_rated_health',
    'health_access_unmet_medical_need',
    'health_service_quality',
    'environmental_health_consequences',
  ],
  'living conditions': [
    'food_insecurity',
    'overcrowding',
    'indoor_toilet_companion',
    'internet_access_at_home',
    'makes_ends_meet_with_difficulty',
    'no_bank_account',
    'women_have_money_of_their_own',
  ],
};
