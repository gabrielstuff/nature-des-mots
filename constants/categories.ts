export const CATEGORIES = [
  { code: 'D', label: 'Déterminant' },
  { code: 'NC', label: 'Nom Commun' },
  { code: 'V', label: 'Verbe' },
  { code: 'NP', label: 'Nom Propre' },
  { code: 'AQ', label: 'Adjectif Qualificatif' },
  { code: 'MO', label: 'Mot Invariable' },
  { code: 'PP', label: 'Pronom Personnel' },
] as const

type CategoryTuple = typeof CATEGORIES
export type CategoryCode = CategoryTuple[number]['code']
