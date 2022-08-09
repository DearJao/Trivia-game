function getQuestionsWithSortedAnswers(arrayOfObj) {
  const sortFactor = 0.5;
  return arrayOfObj.map((item) => {
    const { correct_answer: correctAnswer, incorrect_answers: incorrectAnswers } = item;
    const answersList = [correctAnswer, ...incorrectAnswers];
    const sortedAnswersList = answersList.sort(() => Math.random() - sortFactor);
    return { ...item, sortedAnswersList };
  });
}

export default getQuestionsWithSortedAnswers;
