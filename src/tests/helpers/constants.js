export const invalidResponse = {
  response_code: 3,
  results: [],
};

export const emptyResponse = {
  response_code: 0,
  results: [],
}

export const successResponse = {
  response_code: 0,
  results: [
    {
      category: 'History',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which one of these tanks was designed and operated by the United Kingdom?',
      correct_answer: 'Tog II',
      incorrect_answers: [
        'M4 Sherman',
        'Tiger H1',
        'T-34'
      ],
      sortedAnswersList: [
        'Tog II',
        'M4 Sherman',
        'T-34',
        'Tiger H1'
      ]
    },
    {
      category: 'Entertainment: Film',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the name of the first &quot;Star Wars&quot; film by release order?',
      correct_answer: 'A New Hope',
      incorrect_answers: [
        'The Phantom Menace',
        'The Force Awakens',
        'Revenge of the Sith'
      ],
      sortedAnswersList: [
        'The Phantom Menace',
        'A New Hope',
        'Revenge of the Sith',
        'The Force Awakens'
      ]
    },
    {
      category: 'Entertainment: Board Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'In Yu-Gi-Oh, how does a player perform an Xyz Summon?',
      correct_answer: 'Overlay at least 2 Monsters of the Same Level',
      incorrect_answers: [
        'Activate a Spell and Send Monsters to the Graveyard',
        'Add the Monsters&#039; Levels Together to Match the Xyz Monster',
        'Banish A Number of Monsters From Your Hand And Deck'
      ],
      sortedAnswersList: [
        'Banish A Number of Monsters From Your Hand And Deck',
        'Overlay at least 2 Monsters of the Same Level',
        'Add the Monsters&#039; Levels Together to Match the Xyz Monster',
        'Activate a Spell and Send Monsters to the Graveyard'
      ]
    },
    {
      category: 'Science: Computers',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Who invented the &quot;Spanning Tree Protocol&quot;?',
      correct_answer: 'Radia Perlman',
      incorrect_answers: [
        'Paul Vixie',
        'Vint Cerf',
        'Michael Roberts'
      ],
      sortedAnswersList: [
        'Michael Roberts',
        'Vint Cerf',
        'Paul Vixie',
        'Radia Perlman'
      ]
    },
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'easy',
      question: 'The likeness of which president is featured on the rare $2 bill of USA currency?',
      correct_answer: 'Thomas Jefferson',
      incorrect_answers: [
        'Martin Van Buren',
        'Ulysses Grant',
        'John Quincy Adams'
      ],
      sortedAnswersList: [
        'John Quincy Adams',
        'Ulysses Grant',
        'Martin Van Buren',
        'Thomas Jefferson'
      ]
    }
  ]
};
