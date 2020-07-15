// TODO: Convert these to use the GDC API
export const ssmFacets = [
  {
    name: 'consequence.transcript.annotation.polyphen_impact',
    prettyName: 'polyphen impact',
    values: ['benign', 'probably_damaging', 'possibly_damaging', 'unknown'],
  },
  {
    name: 'consequence.transcript.annotation.sift_impact',
    prettyName: 'sift impact',
    values: [
      'deleterious',
      'tolerated',
      'deleterious_low_confidence',
      'tolerated_low_confidence',
    ],
  },
  {
    name: 'consequence.transcript.annotation.vep_impact',
    prettyName: 'vep impact',
    values: ['modifier', 'moderate', 'low', 'high'],
  },
  {
    name: 'consequence.transcript.consequence_type',
    prettyName: 'consequence type',
    values: [
      'missense_variant',
      'downstream_gene_variant',
      'non_coding_transcript_exon_variant',
      'synonymous_variant',
      'intron_variant',
      'upstream_gene_variant',
      '3_prime_UTR_variant',
      'stop_gained',
      'frameshift_variant',
      '5_prime_UTR_variant',
      'splice_region_variant',
      'splice_acceptor_variant',
      'splice_donor_variant',
      'inframe_deletion',
      'inframe_insertion',
      'start_lost',
      'protein_altering_variant',
      'stop_lost',
      'stop_retained_variant',
      'coding_sequence_variant',
      'incomplete_terminal_codon_variant',
      'mature_miRNA_variant',
    ],
  },
  {
    name: 'mutation_subtype',
    prettyName: 'mutation subtype',
    values: ['single base substitution', 'small deletion', 'small insertion'],
  },
  {
    name: 'occurrence.case.observation.variant_calling.variant_caller',
    prettyName: 'variant caller',
    values: ['mutect2', 'varscan', 'muse', 'somaticsniper'],
  },
]
export const geneFacets = [
  {
    name: 'biotype',
    prettyName: 'biotype',
    values: [
      'protein_coding',
      'lincRNA',
      'miRNA',
      'transcribed_unprocessed_pseudogene',
      'processed_pseudogene',
      'antisense',
      'unprocessed_pseudogene',
      'snoRNA',
      'IG_V_gene',
      'processed_transcript',
      'transcribed_processed_pseudogene',
      'TR_V_gene',
      'TR_J_gene',
      'unitary_pseudogene',
      'misc_RNA',
      'snRNA',
      'IG_V_pseudogene',
      'polymorphic_pseudogene',
      'IG_D_gene',
      'sense_overlapping',
      'sense_intronic',
      'IG_C_gene',
      'TEC',
      'IG_J_gene',
      'rRNA',
      'TR_C_gene',
      'TR_D_gene',
      'TR_V_pseudogene',
      'macro_lncRNA',
      'transcribed_unitary_pseudogene',
      'translated_unprocessed_pseudogene',
      'vaultRNA',
    ],
  },
  {
    name: 'is_cancer_gene_census',
    prettyName: 'is cancer gene census',
    values: ['1'],
  },
]
export const caseFacets = [
  {
    name: 'demographic.ethnicity',
    prettyName: 'ethnicity',
    values: [
      'not hispanic or latino',
      'not reported',
      'hispanic or latino',
      'unknown',
    ],
  },
  {
    name: 'demographic.gender',
    prettyName: 'gender',
    values: ['female', 'male', 'unknown', 'not reported', 'unspecified'],
  },
  {
    name: 'demographic.race',
    prettyName: 'race',
    values: [
      'white',
      'not reported',
      'unknown',
      'black or african american',
      'asian',
      'other',
      'american indian or alaska native',
      'native hawaiian or other pacific islander',
      'not allowed to collect',
    ],
  },
  {
    name: 'disease_type',
    prettyName: 'disease type',
    values: [
      'adenomas and adenocarcinomas',
      'ductal and lobular neoplasms',
      'epithelial neoplasms, nos',
      'gliomas',
      'squamous cell neoplasms',
      'myeloid leukemias',
      'cystic, mucinous and serous neoplasms',
      'nevi and melanomas',
      'lymphoid leukemias',
      'transitional cell papillomas and carcinomas',
      'complex mixed and stromal neoplasms',
      'neuroepitheliomatous neoplasms',
      'neoplasms, nos',
      'plasma cell tumors',
      'germ cell neoplasms',
      'mesothelial neoplasms',
      'myomatous neoplasms',
      'osseous and chondromatous neoplasms',
      'mature b-cell lymphomas',
      'chronic myeloproliferative disorders',
      'lymphoid neoplasm diffuse large b-cell lymphoma',
      'myelodysplastic syndromes',
      'lipomatous neoplasms',
      'fibromatous neoplasms',
      'acinar cell neoplasms',
      'meningiomas',
      'soft tissue tumors and sarcomas, nos',
      'not reported',
      'thymic epithelial neoplasms',
      'complex epithelial neoplasms',
      'paragangliomas and glomus tumors',
      'leukemias, nos',
      'blood vessel tumors',
      'miscellaneous bone tumors',
      'specialized gonadal neoplasms',
      'nerve sheath tumors',
      'synovial-like neoplasms',
      'mature t- and nk-cell lymphomas',
      'not applicable',
      'miscellaneous tumors',
      'other leukemias',
      'neoplasms of histiocytes and accessory lymphoid cells',
      'mucoepidermoid neoplasms',
      'adnexal and skin appendage neoplasms',
      'basal cell neoplasms',
      'unknown',
      'malignant lymphomas, nos or diffuse',
      'fibroepithelial neoplasms',
      'granular cell tumors and alveolar soft part sarcomas',
      'hodgkin lymphoma',
      'trophoblastic neoplasms',
      'myxomatous neoplasms',
      'precursor cell lymphoblastic lymphoma',
      'mast cell tumors',
      'mesonephromas',
      'immunoproliferative diseases',
      'giant cell tumors',
      'odontogenic tumors',
      'lymphatic vessel tumors',
      'other hematologic disorders',
    ],
  },
  {
    name: 'primary_site',
    prettyName: 'primary site',
    values: [
      'bronchus and lung',
      'hematopoietic and reticuloendothelial systems',
      'breast',
      'colon',
      'spinal cord, cranial nerves, and other parts of central nervous system',
      'ovary',
      'kidney',
      'unknown',
      'skin',
      'pancreas',
      'prostate gland',
      'uterus, nos',
      'bladder',
      'liver and intrahepatic bile ducts',
      'connective, subcutaneous and other soft tissues',
      'thyroid gland',
      'brain',
      'esophagus',
      'stomach',
      'rectum',
      'other and ill-defined sites',
      'adrenal gland',
      'corpus uteri',
      'other and ill-defined digestive organs',
      'heart, mediastinum, and pleura',
      'cervix uteri',
      'other and unspecified major salivary glands',
      'lymph nodes',
      'testis',
      'bones, joints and articular cartilage of other and unspecified sites',
      'retroperitoneum and peritoneum',
      'other and ill-defined sites in lip, oral cavity and pharynx',
      'not reported',
      'thymus',
      'peripheral nerves and autonomic nervous system',
      'bones, joints and articular cartilage of limbs',
      'small intestine',
      'gallbladder',
      'meninges',
      'anus and anal canal',
      'eye and adnexa',
      'other and unspecified parts of biliary tract',
      'other and unspecified urinary organs',
      'oropharynx',
      'other endocrine glands and related structures',
      'larynx',
      'other and unspecified female genital organs',
      'other and unspecified parts of tongue',
      'nasopharynx',
      'rectosigmoid junction',
      'vagina',
      'floor of mouth',
      'tonsil',
      'other and unspecified parts of mouth',
      'nasal cavity and middle ear',
      'penis',
      'hypopharynx',
      'base of tongue',
      'ureter',
      'gum',
      'vulva',
      'lip',
      'trachea',
      'palate',
      'blood',
      'other and unspecified male genital organs',
      'renal pelvis',
    ],
  },
  {
    name: 'project.program.name',
    prettyName: 'program name',
    values: [
      'GENIE',
      'FM',
      'TCGA',
      'TARGET',
      'MMRF',
      'CPTAC',
      'BEATAML1.0',
      'NCICCR',
      'OHSU',
      'CGCI',
      'WCDT',
      'ORGANOID',
      'CTSP',
      'HCMI',
      'VAREPOP',
    ],
  },
  {
    name: 'project.project_id',
    prettyName: 'project id',
    values: [
      'FM-AD',
      'GENIE-MSK',
      'GENIE-DFCI',
      'GENIE-MDA',
      'GENIE-JHU',
      'GENIE-UHN',
      'TARGET-AML',
      'GENIE-VICC',
      'TARGET-ALL-P2',
      'TARGET-NBL',
      'TCGA-BRCA',
      'GENIE-GRCC',
      'MMRF-COMMPASS',
      'GENIE-NKI',
      'TARGET-WT',
      'TCGA-GBM',
      'TCGA-OV',
      'TCGA-LUAD',
      'BEATAML1.0-COHORT',
      'TCGA-UCEC',
      'TCGA-KIRC',
      'TCGA-HNSC',
      'TCGA-LGG',
      'TCGA-THCA',
      'TCGA-LUSC',
      'TCGA-PRAD',
      'NCICCR-DLBCL',
      'TCGA-SKCM',
      'TCGA-COAD',
      'TCGA-STAD',
      'CPTAC-3',
      'TCGA-BLCA',
      'TARGET-OS',
      'TCGA-LIHC',
      'CPTAC-2',
      'TCGA-CESC',
      'TCGA-KIRP',
      'TCGA-SARC',
      'TCGA-LAML',
      'TARGET-ALL-P3',
      'TCGA-ESCA',
      'TCGA-PAAD',
      'TCGA-PCPG',
      'OHSU-CNL',
      'TCGA-READ',
      'TCGA-TGCT',
      'TCGA-THYM',
      'CGCI-BLGSP',
      'TCGA-KICH',
      'WCDT-MCRPC',
      'TCGA-ACC',
      'TCGA-MESO',
      'TCGA-UVM',
      'ORGANOID-PANCREATIC',
      'TARGET-RT',
      'TCGA-DLBC',
      'TCGA-UCS',
      'BEATAML1.0-CRENOLANIB',
      'TCGA-CHOL',
      'CTSP-DLBCL1',
      'TARGET-ALL-P1',
      'HCMI-CMDC',
      'TARGET-CCSK',
      'VAREPOP-APOLLO',
    ],
  },
  {
    name: 'samples.sample_type',
    prettyName: 'sample type',
    values: [
      'primary tumor',
      'metastatic',
      'blood derived normal',
      'primary blood derived cancer - bone marrow',
      'solid tissue normal',
      'tumor',
      'not reported',
      'bone marrow normal',
      'primary blood derived cancer - peripheral blood',
      'recurrent blood derived cancer - bone marrow',
      'recurrent blood derived cancer - peripheral blood',
      'blood derived cancer - peripheral blood',
      'recurrent tumor',
      'next generation cancer model',
      'blood derived cancer - bone marrow, post-treatment',
      'granulocytes',
      'fibroblasts from bone marrow normal',
      'primary xenograft tissue',
      'buccal cell normal',
      'blood derived cancer - bone marrow',
      'unknown',
      'additional - new primary',
      'mononuclear cells from bone marrow normal',
      'blood derived cancer - peripheral blood, post-treatment',
      'cell lines',
      'ffpe scrolls',
      'expanded next generation cancer model',
      'additional metastatic',
      'lymphoid normal',
      'post neo-adjuvant therapy',
      'control analyte',
      'slides',
    ],
  },
  {
    name: 'summary.experimental_strategies.experimental_strategy',
    prettyName: 'experimental strategy',
    values: [
      'Targeted Sequencing',
      'WXS',
      'RNA-Seq',
      'miRNA-Seq',
      'Genotyping Array',
      'Methylation Array',
      'Tissue Slide',
      'Diagnostic Slide',
      'WGS',
      'ATAC-Seq',
    ],
  },
]

export const mutationHighlightFeatures = [
  {
    name: 'VEP',
    attributeName: 'vep_impact',
    type: 'category',
    description: 'Colour by VEP impact (canonical transcript).',
    values: [
      { name: 'LOW', colour: 'blue' },
      { name: 'MODIFIER', colour: 'goldenrod' },
      { name: 'MODERATE', colour: 'orange' },
      { name: 'HIGH', colour: 'red' },
      { name: '', colour: 'lightgrey' },
    ],
  },
  {
    name: 'PolyPhen',
    type: 'category',
    attributeName: 'polyphen_impact',
    description: 'Colour by PolyPhen impact (canonical transcript).',
    values: [
      { name: 'benign', colour: 'green' },
      { name: 'possibly_damaging', colour: 'orange' },
      { name: 'probably_damaging', colour: 'red' },
      { name: 'unknown', colour: 'grey' },
      { name: '', colour: 'lightgrey' },
    ],
  },
  {
    name: 'SIFT',
    type: 'category',
    attributeName: 'sift_impact',
    description: 'Colour by SIFT impact (canonical transcript).',
    values: [
      { name: 'deleterious', colour: 'red' },
      { name: 'tolerated', colour: 'green' },
      { name: 'deleterious_low_confidence', colour: 'lightcoral' },
      { name: 'tolerated_low_confidence', colour: 'lightgreen' },
      { name: '', colour: 'lightgrey' },
    ],
  },
  {
    name: 'Mutation Subtype',
    type: 'category',
    attributeName: 'mutationSubtype',
    description: 'Colour by the type of mutation.',
    values: [
      { name: 'Single base substitution', colour: 'green' },
      { name: 'Small deletion', colour: 'red' },
      { name: 'Small insertion', colour: 'blue' },
      { name: '', colour: 'lightgrey' },
    ],
  },
  {
    name: 'Mutation Count',
    type: 'threshold',
    description:
      'Colour by mutation occurrence count across the current cohort.',
    attributeName: 'score',
    values: [{ name: 'Count', colour1: 'red', colour2: 'blue', threshold: 2 }],
  },
  {
    name: 'Mutation Frequency',
    type: 'percentage',
    description: 'Frequency of mutation occurrence across the current cohort.',
    attributeName: 'percentage',
    values: [
      { name: 'Percentage', colour1: 'dark green', colour2: 'light green' },
    ],
  },
]

export const geneHighlightFeatures = [
  {
    name: 'Is Cancer Gene Census',
    attributeName: 'isCancerGeneCensus',
    type: 'boolean',
    description: 'Colour by cancer gene census status.',
    values: [
      { name: 'Is Cancer Gene Census', colour1: 'red', colour2: 'blue' },
    ],
  },
]