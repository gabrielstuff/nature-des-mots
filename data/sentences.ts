export interface ClassifiedSentence {
  sentence: string
  /* Array of categories matching each word in the sentence */
  categories: (
    | 'D'  // Déterminant
    | 'NC' // Nom Commun
    | 'V'  // Verbe
    | 'NP' // Nom Propre
    | 'AQ' // Adjectif Qualificatif
    | 'MO' // Mot Invariable
    | 'PP' // Pronom Personnel
  )[]
}

/*
 * This array is *the* source of truth for the game.
 * Feel free to edit / add sentences.
 * Make sure that:
 *  - The number of categories equals the number of words (split by a single space) in the sentence.
 *  - Use the exact codes listed in the `ClassifiedSentence` interface above.
 */
export default <ClassifiedSentence[]>[
  {
    sentence: 'Le chat noir dort',
    categories: ['D', 'NC', 'AQ', 'V'],
  },
  {
    sentence: 'Marie aime les croissants frais',
    categories: ['NP', 'V', 'D', 'NC', 'AQ'],
  },
  {
    sentence: 'Ils vont rapidement au marché',
    categories: ['PP', 'V', 'MO', 'MO', 'NC'],
  },
]
