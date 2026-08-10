/**
 * 퀴즈/합격 로직 검증 스크립트
 * 실행: node test_logic.js
 * (브라우저 앱과 동일한 quiz_data.js를 사용)
 */
const fs = require("fs");
const path = require("path");

eval(
  fs
    .readFileSync(path.join(__dirname, "quiz_data.js"), "utf8")
    .replace("const QUIZ_SOURCE", "globalThis.QUIZ_SOURCE"),
);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateQuizData() {
  const categories = Object.keys(QUIZ_SOURCE);
  const selectedQuestions = [];
  const used = new Set();

  categories.forEach((category) => {
    const pool = QUIZ_SOURCE[category].questions.map((q, i) => ({
      ...q,
      category,
      _key: `${category}-${i}`,
    }));
    shuffleArray(pool);
    if (pool[0] && selectedQuestions.length < 10) {
      selectedQuestions.push(pool[0]);
      used.add(pool[0]._key);
    }
  });

  const catCount = {};
  selectedQuestions.forEach((q) => {
    catCount[q.category] = (catCount[q.category] || 0) + 1;
  });

  let allQuestions = [];
  categories.forEach((category) => {
    QUIZ_SOURCE[category].questions.forEach((q, i) => {
      const key = `${category}-${i}`;
      if (!used.has(key)) allQuestions.push({ ...q, category, _key: key });
    });
  });
  shuffleArray(allQuestions);

  for (let i = 0; i < allQuestions.length && selectedQuestions.length < 10; ) {
    const q = allQuestions[i];
    const n = catCount[q.category] || 0;
    if (n >= 2) {
      i++;
      continue;
    }
    selectedQuestions.push(q);
    used.add(q._key);
    catCount[q.category] = n + 1;
    allQuestions.splice(i, 1);
  }
  while (selectedQuestions.length < 10 && allQuestions.length > 0) {
    selectedQuestions.push(allQuestions.shift());
  }
  shuffleArray(selectedQuestions);

  return selectedQuestions.map((q, index) => {
    const choicesWithIndex = q.choices.map((text, originalIdx) => ({
      text,
      originalIdx,
    }));
    shuffleArray(choicesWithIndex);
    return {
      id: index + 1,
      category: q.category,
      question: q.question,
      choices: choicesWithIndex.map((c) => c.text),
      answer: choicesWithIndex.findIndex((c) => c.originalIdx === q.answer),
      originalAnswer: q.answer,
    };
  });
}

function isPass(correctCount, total, hpDepleted) {
  if (hpDepleted) return false;
  return (correctCount / Math.max(total, 1)) * 100 >= 80;
}

console.log("=== Vibe Coding Quiz Verification ===");

let totalPool = 0;
Object.keys(QUIZ_SOURCE).forEach((cat) => {
  const n = QUIZ_SOURCE[cat].questions.length;
  totalPool += n;
  console.log(`- ${cat}: ${n}문항`);
});
console.log(`TOTAL POOL: ${totalPool}`);

const quizData = generateQuizData();
console.log(`Generated round: ${quizData.length} questions`);

let badAnswers = 0;
let nonZeroAnswers = 0;
const categoryCount = {};
quizData.forEach((q) => {
  if (q.answer < 0 || q.answer >= q.choices.length) badAnswers++;
  if (q.answer !== 0) nonZeroAnswers++;
  categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
});

console.log("Category mix:", categoryCount);
console.log("Shuffled answers (not always 0):", nonZeroAnswers);
console.log("Bad answer indexes:", badAnswers);

console.log("Pass rule checks:");
console.log("  8/10 + HP ok =>", isPass(8, 10, false), "(expect true)");
console.log("  7/10 + HP ok =>", isPass(7, 10, false), "(expect false)");
console.log("  10/10 + HP dead =>", isPass(10, 10, true), "(expect false)");

const ok =
  quizData.length === 10 &&
  badAnswers === 0 &&
  Object.keys(categoryCount).length >= 4 &&
  isPass(8, 10, false) === true &&
  isPass(7, 10, false) === false;

console.log(ok ? "PASS: logic looks good." : "FAIL: check quiz generation/pass rules.");
process.exit(ok ? 0 : 1);
