// 퀴즈 데이터 소스
const QUIZ_SOURCE = {
  "기초 이론": {
    questions: [
      {
        question: "바이브 코딩이 추구하는 핵심 가치는 무엇인가요?",
        choices: [
          "코딩의 민주화",
          "코딩의 엘리트화",
          "AI의 완전한 지배",
          "인간의 수작업 강조",
        ],
        answer: 0,
      },
      {
        question: "바이브 코딩의 핵심 4요소가 아닌 것은 무엇인가요?",
        choices: [
          "Computer(컴퓨터)",
          "Vibe(의도)",
          "Natural Language(자연어)",
          "Human(감독관)",
        ],
        answer: 0,
      },
    ],
  },
  "핵심 용어": {
    questions: [
      {
        question: "AI에게 내리는 명령이나 질문을 지칭하는 용어는?",
        choices: [
          "프롬프트(Prompt)",
          "스크립트(Script)",
          "쿼리(Query)",
          "커맨드(Command)",
        ],
        answer: 0,
      },
      {
        question:
          "AI가 사실이 아닌 정보를 마치 진실인 것처럼 뻔뻔하게 대답하는 현상은?",
        choices: [
          "할루시네이션(Hallucination)",
          "버그(Bug)",
          "글리치(Glitch)",
          "오버피팅(Overfitting)",
        ],
        answer: 0,
      },
    ],
  },
  "실전 도구": {
    questions: [
      {
        question:
          "VS Code를 기반으로 만든 현재 가장 강력하고 대중적인 AI 에디터는?",
        choices: ["Cursor", "Visual Studio", "IntelliJ", "Sublime Text"],
        answer: 0,
      },
      {
        question: "화려한 UI 없이 터미널(명령창)에서 대화하듯 코딩하는 도구는?",
        choices: ["Claude Code", "GitHub Copilot", "ChatGPT", "Tabnine"],
        answer: 0,
      },
    ],
  },
  "심화 개념": {
    questions: [
      {
        question:
          "게임의 '세이브 포인트'처럼 코드를 저장하고 복구할 수 있게 해주는 도구는?",
        choices: ["Git", "SVN", "Backup", "Cloud"],
        answer: 0,
      },
      {
        question:
          "AI에게 '팔과 다리'를 달아주어 외부 도구(DB, 캘린더 등)와 연결하는 표준 규격은?",
        choices: ["MCP (Model Context Protocol)", "API", "SDK", "REST"],
        answer: 0,
      },
    ],
  },
};

// 셔플 함수
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 퀴즈 생성 함수
function generateQuizData() {
  let allQuestions = [];

  Object.keys(QUIZ_SOURCE).forEach((category) => {
    const questions = QUIZ_SOURCE[category].questions.map((q) => ({
      ...q,
      category: category,
    }));
    allQuestions = allQuestions.concat(questions);
  });

  shuffleArray(allQuestions);

  // 테스트를 위해 모든 문제 사용 (최대 10개)
  const selectedQuestions = allQuestions.slice(0, 10);

  return selectedQuestions.map((q, index) => {
    const choicesWithIndex = q.choices.map((text, originalIdx) => ({
      text,
      originalIdx,
    }));

    shuffleArray(choicesWithIndex);

    const newChoices = choicesWithIndex.map((c) => c.text);
    const newAnswer = choicesWithIndex.findIndex(
      (c) => c.originalIdx === q.answer,
    );

    return {
      id: index + 1,
      category: q.category,
      question: q.question,
      choices: newChoices,
      answer: newAnswer,
      originalAnswer: q.answer,
    };
  });
}

// 테스트 실행
console.log("=== Quiz Logic Verification Test ===");
const quizData = generateQuizData();

console.log(`Generated ${quizData.length} questions.`);
console.log("-------------------------------------");

let randomAnswerCount = 0;
let categoryCount = {};

quizData.forEach((q) => {
  console.log(`[${q.category}] ${q.question.substring(0, 20)}...`);
  console.log(`Choices: ${q.choices.join(", ")}`);
  console.log(`Answer Index: ${q.answer} (Original: ${q.originalAnswer})`);
  console.log("-------------------------------------");

  if (q.answer !== 0) randomAnswerCount++;

  categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
});

console.log("=== Statistics ===");
console.log(`Total Questions: ${quizData.length}`);
console.log(`Questions with Answer NOT at index 0: ${randomAnswerCount}`);
console.log(`Category Distribution:`, categoryCount);

if (randomAnswerCount > 0) {
  console.log("PASS: Answer placement is randomized.");
} else {
  console.log("FAIL: All answers are at index 0 (or extreme bad luck).");
}

if (Object.keys(categoryCount).length > 1) {
  console.log("PASS: Categories are mixed.");
} else {
  console.log("FAIL: Only one category selected.");
}
