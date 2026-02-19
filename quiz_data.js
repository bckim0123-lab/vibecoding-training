// 바이브코딩 훈련소 퀴즈 데이터
// vibecodingstart_cleaned.docx 내용을 바탕으로 구성됨

const QUIZ_SOURCE = {
  "기초 이론": {
    summary: `
      <h3>바이브 코딩(Vibe Coding)이란?</h3>
      <p>AI와 인간의 협업을 통해 코딩의 장벽을 낮추고(<strong>민주화</strong>), 자연어로 프로그래밍하는 새로운 패러다임입니다.</p>
      
      <h3>핵심 4요소</h3>
      <ul class="study-list">
        <li><strong>Vibe (의도)</strong>: 무엇을 만들고 싶은지에 대한 본질적인 생각</li>
        <li><strong>Natural Language (자연어)</strong>: 복잡한 코드 대신 우리가 쓰는 말로 명령</li>
        <li><strong>AI (기술 파트너)</strong>: 실제 코딩 작업을 수행하는 동반자</li>
        <li><strong>Human (감독관)</strong>: AI를 지휘하고 결과물을 검증하는 주체</li>
      </ul>
    `,
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
        explanation:
          "바이브 코딩은 누구나 쉽게 코딩할 수 있는 '코딩의 민주화'를 지향합니다.",
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
        explanation:
          "핵심 4요소는 Vibe, Natural Language, AI, Human입니다. Computer는 도구일 뿐입니다.",
      },
      {
        question: "바이브 코딩에서 인간(Human)의 주된 역할은 무엇인가요?",
        choices: [
          "감독관(Director)",
          "단순 코더(Coder)",
          "데이터 라벨러",
          "AI의 보조자",
        ],
        answer: 0,
        explanation:
          "인간은 AI에게 의도를 전달하고 결과물을 검증하는 '감독관(Director)'의 역할을 수행합니다.",
      },
    ],
  },
  "핵심 용어": {
    summary: `
      <h3>AI 개발 필수 용어</h3>
      <ul class="study-list">
        <li><strong>LLM (거대 언어 모델)</strong>: AI의 두뇌. 방대한 데이터를 학습한 모델.</li>
        <li><strong>Prompt (프롬프트)</strong>: AI에게 내리는 명령이나 질문.</li>
        <li><strong>Context (문맥)</strong>: AI가 올바른 답을 내기 위해 필요한 배경 정보 (파일 구조, 이전 대화 등).</li>
        <li><strong>Hallucination (할루시네이션)</strong>: AI가 사실이 아닌 정보를 마치 진실인 것처럼 뻔뻔하게 대답하는 현상 (환각).</li>
      </ul>
    `,
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
        explanation:
          "AI가 수행해야 할 작업을 자연어로 지시하는 것을 '프롬프트'라고 합니다.",
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
        explanation:
          "할루시네이션(환각)은 AI 모델이 잘못된 정보를 생성하는 현상을 말합니다.",
      },
      {
        question:
          "AI에게 프로젝트의 배경 정보나 이전 대화 내용을 제공하는 것을 무엇이라 하나요?",
        choices: [
          "컨텍스트(Context)",
          "데이터셋(Dataset)",
          "파라미터(Parameter)",
          "인덱스(Index)",
        ],
        answer: 0,
        explanation:
          "AI가 올바른 답을 내기 위해 필요한 배경 정보를 '컨텍스트'라고 합니다.",
      },
    ],
  },
  "실전 도구": {
    summary: `
      <h3>바이브 코딩 3대 도구</h3>
      <div class="tool-card">
        <h4>1. Cursor (커서)</h4>
        <p>VS Code 기반의 표준 AI 에디터. <strong>Composer</strong>(멀티 파일 편집)와 <strong>Tab</strong>(자동 완성) 기능이 강력함.</p>
      </div>
      <div class="tool-card">
        <h4>2. Claude Code (클로드 코드)</h4>
        <p>터미널 기반의 자율 에이전트. 복잡한 명령을 대화하듯 수행.</p>
      </div>
      <div class="tool-card">
        <h4>3. Antigravity (Project IDX)</h4>
        <p>구글의 완전 자율형 클라우드 IDE. 기획부터 배포까지 한 번에.</p>
      </div>
    `,
    questions: [
      {
        question:
          "VS Code를 기반으로 만든 현재 가장 강력하고 대중적인 AI 에디터는?",
        choices: ["Cursor", "Visual Studio", "IntelliJ", "Sublime Text"],
        answer: 0,
        explanation:
          "Cursor는 VS Code 포크 버전으로, AI 기능이 강력하게 통합된 에디터입니다.",
      },
      {
        question:
          "Cursor의 기능 중, 여러 파일을 동시에 생성하고 수정할 수 있는 기능은?",
        choices: ["Composer", "Tab", "Chat", "Terminal"],
        answer: 0,
        explanation:
          "Composer(Ctrl+I)는 멀티 파일 편집과 프로젝트 전체 관리를 지원하는 강력한 기능입니다.",
      },
      {
        question: "화려한 UI 없이 터미널(명령창)에서 대화하듯 코딩하는 도구는?",
        choices: ["Claude Code", "GitHub Copilot", "ChatGPT", "Tabnine"],
        answer: 0,
        explanation:
          "Claude Code는 앤스로픽이 만든 터미널 기반의 에이전트 도구입니다.",
      },
    ],
  },
  "심화 개념": {
    summary: `
      <h3>전문가로 거듭나는 개념</h3>
      <ul class="study-list">
        <li><strong>MCP (Model Context Protocol)</strong>: AI에게 '팔과 다리'를 달아주는 표준. 외부 도구(DB, Slack 등)와 연결.</li>
        <li><strong>Git (깃)</strong>: 코드의 <strong>'세이브 포인트'</strong>. 언제든 이전 상태로 되돌릴 수 있는 안전장치.</li>
        <li><strong>RAG (검색 증강 생성)</strong>: <strong>'오픈북 테스트'</strong>. AI가 학습하지 않은 비공개 문서나 최신 정보를 참조하여 답변하는 기술.</li>
      </ul>
    `,
    questions: [
      {
        question:
          "게임의 '세이브 포인트'처럼 코드를 저장하고 복구할 수 있게 해주는 도구는?",
        choices: ["Git", "SVN", "Backup", "Cloud"],
        answer: 0,
        explanation:
          "Git은 버전 관리 시스템으로, 코드의 변경 이력을 관리하고 복구할 수 있게 해줍니다.",
      },
      {
        question:
          "AI에게 '팔과 다리'를 달아주어 외부 도구(DB, 캘린더 등)와 연결하는 표준 규격은?",
        choices: ["MCP (Model Context Protocol)", "API", "SDK", "REST"],
        answer: 0,
        explanation:
          "MCP는 AI 모델이 외부 데이터나 도구와 상호작용할 수 있게 해주는 프로토콜입니다.",
      },
      {
        question:
          "AI가 학습하지 않은 비공개 문서나 최신 정보를 참조하여 답변하는 기술은?",
        choices: [
          "RAG (검색 증강 생성)",
          "Fine-tuning",
          "Pre-training",
          "Embedding",
        ],
        answer: 0,
        explanation:
          "RAG(Retrieval-Augmented Generation)는 외부 지식을 검색(Retrieval)하여 생성(Generation)에 활용하는 기술입니다.",
      },
    ],
  },
};
