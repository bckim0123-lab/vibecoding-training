// 바이브코딩 훈련소 퀴즈 데이터
// 2025–2026 기초 바이브코딩 커리큘럼 기준

const QUIZ_SOURCE = {
  "기초 이론": {
    summary: `
      <h3>바이브 코딩(Vibe Coding)이란?</h3>
      <p>자연어로 의도를 전달하고 AI가 코드를 생성하며, 사람이 <strong>디렉팅·검증</strong>하는 개발 방식입니다.
      핵심 슬로건은 <strong>"코딩하지 말고, 디렉팅하라"</strong>입니다.</p>
      
      <h3>핵심 4요소</h3>
      <ul class="study-list">
        <li><strong>Vibe (의도)</strong>: 무엇을 만들고 싶은지에 대한 본질</li>
        <li><strong>Natural Language (자연어)</strong>: 복잡한 문법 대신 말로 지시</li>
        <li><strong>AI (실행 파트너)</strong>: 코드를 작성·수정하는 동반자</li>
        <li><strong>Human (감독관)</strong>: 지시하고 결과물을 검증하는 주체</li>
      </ul>
    `,
    questions: [
      {
        question: "바이브 코딩의 핵심 철학을 가장 잘 나타내는 문장은?",
        choices: [
          "문법부터 완벽히 암기해야 한다",
          "코딩하지 말고, 디렉팅하라",
          "AI에게 모든 판단을 맡긴다",
          "테스트는 나중에 해도 된다",
        ],
        answer: 1,
        explanation:
          "바이브 코딩은 사람이 의도를 지시하고 AI 결과물을 검증하는 '디렉팅' 중심 패러다임입니다.",
      },
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
          "누구나 자연어로 소프트웨어를 만들 수 있게 하는 '코딩의 민주화'를 지향합니다.",
      },
      {
        question: "바이브 코딩의 핵심 4요소가 아닌 것은?",
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
        question: "바이브 코딩에서 인간(Human)의 주된 역할은?",
        choices: [
          "단순 코더(Coder)",
          "데이터 라벨러",
          "감독관(Director)",
          "AI의 보조자",
        ],
        answer: 2,
        explanation:
          "인간은 AI에게 의도를 전달하고 결과물을 검증하는 감독관(Director) 역할입니다.",
      },
      {
        question: "디렉터(Director)가 가장 집중해야 할 영역은?",
        choices: [
          "문법 암기",
          "코드 한 줄 한 줄 직접 작성",
          "기획, 판단, 검증",
          "컴파일러 최적화",
        ],
        answer: 2,
        explanation:
          "바이브 코딩에서는 구현 디테일보다 기획·판단·검증에 집중합니다.",
      },
      {
        question: "바이브 코딩 개념 확산에 큰 영향을 준 인물은?",
        choices: [
          "스티브 잡스",
          "안드레이 카파시",
          "리누스 토르발스",
          "빌 게이츠",
        ],
        answer: 1,
        explanation:
          "안드레이 카파시가 바이브 코딩을 언급하며 널리 알려졌습니다.",
      },
    ],
  },
  "개발 기초": {
    summary: `
      <h3>개발의 4대 요소</h3>
      <ul class="study-list">
        <li><strong>프론트엔드</strong>: 사용자가 보는 화면 (홀/메뉴판)</li>
        <li><strong>백엔드</strong>: 데이터 처리와 핵심 로직 (주방)</li>
        <li><strong>API</strong>: 프론트와 백을 잇는 통로 (웨이터)</li>
        <li><strong>데이터베이스</strong>: 데이터를 저장하는 창고 (냉장고/창고)</li>
      </ul>
      <p>바이브 코딩에서도 이 구조를 이해해야 AI에게 올바른 지시를 내릴 수 있습니다.</p>
    `,
    questions: [
      {
        question: "사용자가 직접 보고 조작하는 화면을 담당하는 영역은?",
        choices: ["백엔드", "프론트엔드", "데이터베이스", "API"],
        answer: 1,
        explanation: "프론트엔드는 사용자 화면과 상호작용을 담당합니다.",
      },
      {
        question: "실제 데이터 처리와 비즈니스 로직을 담당하는 영역은?",
        choices: ["프론트엔드", "UI", "백엔드", "디자인"],
        answer: 2,
        explanation: "백엔드는 서버에서 데이터를 처리하고 로직을 수행합니다.",
      },
      {
        question: "개발 요소 비유 중 '홀과 주방을 오가는 웨이터'에 해당하는 것은?",
        choices: ["프론트엔드", "백엔드", "데이터베이스", "API"],
        answer: 3,
        explanation:
          "API는 프론트엔드의 요청을 백엔드에 전달하고 결과를 다시 가져다줍니다.",
      },
      {
        question: "회원 정보나 게시글 같은 데이터를 저장하는 곳은?",
        choices: ["API", "프론트엔드", "데이터베이스", "캐시만"],
        answer: 2,
        explanation: "데이터베이스는 데이터를 체계적으로 저장·관리합니다.",
      },
      {
        question: "AI에게 '로그인 화면을 만들어줘'라고 할 때 주로 다루는 영역은?",
        choices: ["데이터베이스 스키마만", "프론트엔드 UI", "서버 인프라만", "네트워크 장비"],
        answer: 1,
        explanation:
          "화면·버튼·입력 폼은 프론트엔드 UI 영역에 해당합니다.",
      },
    ],
  },
  "핵심 용어": {
    summary: `
      <h3>AI 개발 필수 용어</h3>
      <ul class="study-list">
        <li><strong>LLM</strong>: 거대 언어 모델. Claude, GPT, Gemini 등 AI의 '두뇌'</li>
        <li><strong>Prompt</strong>: AI에게 내리는 명령·질문</li>
        <li><strong>Context</strong>: 올바른 답을 위한 배경 정보(파일, 이전 대화, 규칙)</li>
        <li><strong>Context Window</strong>: AI가 한 번에 기억할 수 있는 정보량</li>
        <li><strong>Hallucination</strong>: 사실이 아닌 내용을 진짜처럼 말하는 현상 → 반드시 검증</li>
      </ul>
    `,
    questions: [
      {
        question: "AI에게 내리는 명령이나 질문을 지칭하는 용어는?",
        choices: [
          "스크립트(Script)",
          "프롬프트(Prompt)",
          "쿼리(Query)",
          "커맨드(Command)",
        ],
        answer: 1,
        explanation:
          "AI가 수행할 작업을 자연어로 지시하는 것을 프롬프트라고 합니다.",
      },
      {
        question:
          "AI가 사실이 아닌 정보를 진실인 것처럼 대답하는 현상은?",
        choices: [
          "버그(Bug)",
          "글리치(Glitch)",
          "할루시네이션(Hallucination)",
          "오버피팅(Overfitting)",
        ],
        answer: 2,
        explanation:
          "할루시네이션(환각)은 AI가 잘못된 정보를 생성하는 현상으로, 검증이 필수입니다.",
      },
      {
        question:
          "AI에게 프로젝트 배경이나 이전 대화 내용을 제공하는 것은?",
        choices: [
          "데이터셋(Dataset)",
          "컨텍스트(Context)",
          "파라미터(Parameter)",
          "인덱스(Index)",
        ],
        answer: 1,
        explanation:
          "AI가 올바른 답을 내기 위해 필요한 배경 정보를 컨텍스트라고 합니다.",
      },
      {
        question: "다음 중 LLM(거대 언어 모델)의 예시로 적절한 것은?",
        choices: ["Photoshop", "MySQL", "Claude / GPT / Gemini", "React"],
        answer: 2,
        explanation:
          "Claude, GPT, Gemini 등이 대표적인 거대 언어 모델(LLM)입니다.",
      },
      {
        question: "AI가 더 정확히 답하도록 질문을 다듬는 기술은?",
        choices: [
          "리팩터링",
          "마이그레이션",
          "프롬프트 엔지니어링",
          "컴파일링",
        ],
        answer: 2,
        explanation:
          "프롬프트를 정교하게 다듬는 기술을 프롬프트 엔지니어링이라고 합니다.",
      },
      {
        question: "AI가 한 번에 참조할 수 있는 정보량의 한계를 가리키는 말은?",
        choices: [
          "컨텍스트 윈도우",
          "하드디스크",
          "프레임레이트",
          "대역폭만",
        ],
        answer: 0,
        explanation:
          "컨텍스트 윈도우는 모델이 한 번에 처리할 수 있는 입력·대화 분량의 한계입니다.",
      },
    ],
  },
  "실전 도구": {
    summary: `
      <h3>바이브 코딩 핵심 도구</h3>
      <div class="tool-card">
        <h4>1. Cursor (커서)</h4>
        <p>AI가 내장된 코드 에디터. <strong>Agent</strong>(다중 파일 작업), <strong>Chat</strong>(질문·수정), <strong>Tab</strong>(자동 완성)이 핵심.</p>
      </div>
      <div class="tool-card">
        <h4>2. Claude Code</h4>
        <p>터미널에서 파일을 찾고 수정·실행까지 하는 <strong>에이전트형</strong> 코딩 도구.</p>
      </div>
      <div class="tool-card">
        <h4>3. Rules / MCP</h4>
        <p><strong>Rules</strong>는 AI에게 프로젝트 규칙을 미리 알려주는 가이드.
        <strong>MCP</strong>는 AI를 외부 도구·데이터와 연결하는 표준입니다.</p>
      </div>
    `,
    questions: [
      {
        question: "VS Code 계열로 널리 쓰이는 AI 통합 코드 에디터는?",
        choices: ["IntelliJ만", "Cursor", "Sublime Text만", "메모장"],
        answer: 1,
        explanation:
          "Cursor는 AI 기능이 깊게 통합된 코드 에디터로 바이브 코딩에 자주 쓰입니다.",
      },
      {
        question:
          "Cursor에서 여러 파일을 넘나들며 작업을 맡기는 에이전트형 기능에 가까운 것은?",
        choices: ["Tab만", "Agent(에이전트)", "폰트 설정", "테마 변경"],
        answer: 1,
        explanation:
          "Agent 모드는 프로젝트 단위로 파일을 찾고 수정하는 자율적 작업을 돕습니다.",
      },
      {
        question: "터미널에서 대화하듯 코드를 고치고 명령을 실행하는 도구는?",
        choices: ["Photoshop", "Claude Code", "Excel", "Figma만"],
        answer: 1,
        explanation:
          "Claude Code는 터미널 기반 에이전트 워크플로로 파일 탐색·수정·실행을 수행합니다.",
      },
      {
        question: "코드 작성 중 회색 제안으로 이어 쓰는 Cursor 기능은?",
        choices: ["Tab", "Git Merge", "Docker", "DNS"],
        answer: 0,
        explanation:
          "Tab은 자동 완성 제안을 받아들여 빠르게 코드를 이어 쓰게 돕습니다.",
      },
      {
        question: "프로젝트마다 AI가 따라야 할 코딩 규칙을 미리 적어 두는 것은?",
        choices: ["Rules(룰)", "스크린샷만", "배경화면", "북마크만"],
        answer: 0,
        explanation:
          "Rules는 AI에게 스타일·금지사항·프로젝트 컨벤션을 알려주는 가이드입니다.",
      },
      {
        question: "AI를 캘린더·DB·슬랙 같은 외부 도구와 연결하는 표준에 가까운 것은?",
        choices: ["CSS", "MCP (Model Context Protocol)", "JPEG", "HDMI"],
        answer: 1,
        explanation:
          "MCP는 AI 모델이 외부 데이터·도구와 안전하게 상호작용하도록 돕는 프로토콜입니다.",
      },
    ],
  },
  "심화 개념": {
    summary: `
      <h3>전문가로 가는 기초 안전장치</h3>
      <ul class="study-list">
        <li><strong>Git</strong>: 코드의 '세이브 포인트'. 망가져도 되돌릴 수 있음</li>
        <li><strong>MCP</strong>: AI에게 '팔과 다리'를 달아 외부 도구와 연결</li>
        <li><strong>RAG</strong>: '오픈북 테스트'. 최신·비공개 문서를 검색해 답변에 활용</li>
        <li><strong>검증 습관</strong>: AI 코드를 그대로 믿지 말고 실행·확인</li>
      </ul>
    `,
    questions: [
      {
        question:
          "게임의 '세이브 포인트'처럼 코드를 저장하고 복구할 수 있게 해주는 도구는?",
        choices: ["Backup 폴더만", "Git", "스크린샷", "이메일 임시보관"],
        answer: 1,
        explanation:
          "Git은 버전 관리로 변경 이력을 남기고 이전 상태로 되돌릴 수 있습니다.",
      },
      {
        question:
          "AI에게 '팔과 다리'를 달아 외부 도구와 연결하는 표준 규격은?",
        choices: ["REST만", "SDK만", "MCP (Model Context Protocol)", "USB"],
        answer: 2,
        explanation:
          "MCP는 AI가 외부 데이터·도구와 상호작용할 수 있게 해주는 프로토콜입니다.",
      },
      {
        question:
          "AI가 학습하지 않은 비공개·최신 문서를 참조하게 만드는 기술은?",
        choices: [
          "Fine-tuning만",
          "RAG (검색 증강 생성)",
          "Pre-training만",
          "ZIP 압축",
        ],
        answer: 1,
        explanation:
          "RAG는 외부 지식을 검색(Retrieval)해 생성(Generation)에 활용합니다.",
      },
      {
        question: "바이브 코딩에서 Git이 특히 중요한 이유는?",
        choices: [
          "디자인 색을 고르기 위해",
          "AI가 망가뜨린 코드를 안전하게 되돌리기 위해",
          "인터넷 속도를 올리기 위해",
          "폰트를 바꾸기 위해",
        ],
        answer: 1,
        explanation:
          "AI 작업은 실수가 날 수 있어, Git으로 되돌릴 수 있는 안전장치가 중요합니다.",
      },
      {
        question: "AI가 만든 코드를 바로 배포하기 전에 가장 해야 할 일은?",
        choices: [
          "검증(실행·확인)",
          "아무 생각 없이 커밋",
          "규칙 파일 삭제",
          "테스트 끄기",
        ],
        answer: 0,
        explanation:
          "할루시네이션·버그를 막으려면 실행과 검증이 필수입니다.",
      },
    ],
  },
  "프로세스": {
    summary: `
      <h3>Vibe Loop (바이브 루프)</h3>
      <ul class="study-list">
        <li><strong>지시 (Prompt)</strong>: 원하는 기능을 구체적으로 요청</li>
        <li><strong>생성 (Generate)</strong>: AI가 코드 생성</li>
        <li><strong>검증 (Verify)</strong>: 실행해보고 의도대로인지 확인</li>
        <li><strong>반복 (Iterate)</strong>: 피드백을 주고 개선</li>
      </ul>
      <p>좋은 프롬프트 = 목표 + 제약 + 예시 + 완료 기준을 함께 적는 것.</p>
    `,
    questions: [
      {
        question:
          "AI가 만든 코드를 실행해보고 오류나 품질을 확인하는 단계는?",
        choices: [
          "지시 (Prompt)",
          "생성 (Generate)",
          "검증 (Verify)",
          "반복 (Iterate)",
        ],
        answer: 2,
        explanation:
          "Verify 단계에서 결과물이 의도대로 동작하는지 확인합니다.",
      },
      {
        question: "바이브 코딩의 기본 흐름을 올바르게 나열한 것은?",
        choices: [
          "생성 → 지시 → 반복 → 검증",
          "지시 → 생성 → 검증 → 반복",
          "검증 → 생성 → 지시 → 반복",
          "반복 → 검증 → 생성 → 지시",
        ],
        answer: 1,
        explanation:
          "Vibe Loop는 지시 → 생성 → 검증 → 반복의 순환입니다.",
      },
      {
        question: "효과적인 프롬프트에 들어가면 좋은 요소가 아닌 것은?",
        choices: [
          "목표와 완료 기준",
          "제약 조건(사용 기술, 금지사항)",
          "모호한 '알아서 잘해줘'만",
          "원하는 결과 예시",
        ],
        answer: 2,
        explanation:
          "모호한 지시만으로는 결과가 흔들립니다. 목표·제약·예시를 명확히 적으세요.",
      },
      {
        question: "검증(Verify) 단계에서 하면 좋은 행동은?",
        choices: [
          "코드를 읽지 않고 바로 배포",
          "실행·화면 확인·에러 메시지 확인",
          "Git 기록 전부 삭제",
          "AI에게 검증도 맡기고 자리를 비움",
        ],
        answer: 1,
        explanation:
          "실행과 에러·화면 확인이 검증의 기본입니다. 최종 책임은 사람에게 있습니다.",
      },
      {
        question: "결과가 기대와 다를 때 바이브 코더가 할 일은?",
        choices: [
          "포기하고 종료",
          "피드백을 주고 Iterate(반복)한다",
          "컴퓨터를 재설치한다",
          "문제를 숨긴다",
        ],
        answer: 1,
        explanation:
          "바이브 루프의 핵심은 피드백을 주고 반복 개선하는 것입니다.",
      },
    ],
  },
};
