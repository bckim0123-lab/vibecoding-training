// 바이브코딩 훈련소 퀴즈·학습 데이터
// 목표: 기초 학습자가 "알차고 도움이 된다"고 느끼도록 구성

const QUIZ_SOURCE = {
  "기초 이론": {
    summary: `
      <div class="study-hero">🎯 이 단원에서 얻는 것</div>
      <p class="study-lead">바이브 코딩이 무엇인지, 왜 중요한지, 내가 어떤 역할을 해야 하는지 한 번에 정리합니다.</p>

      <h3>바이브 코딩이란?</h3>
      <p>자연어로 <strong>의도</strong>를 전달하고, AI가 코드를 만들며, 사람이 <strong>디렉팅·검증</strong>하는 개발 방식입니다.
      핵심 슬로건: <strong class="study-quote">"코딩하지 말고, 디렉팅하라"</strong></p>

      <h3>핵심 4요소</h3>
      <ul class="study-list">
        <li><strong>Vibe (의도)</strong> — 무엇을 만들고 싶은가? (기능보다 목적 먼저)</li>
        <li><strong>Natural Language</strong> — 문법 대신 말로 지시</li>
        <li><strong>AI</strong> — 실행·작성 파트너</li>
        <li><strong>Human</strong> — 감독관. 지시하고 결과물을 책임지고 검증</li>
      </ul>

      <div class="study-tip">
        <strong>💡 실전 TIP</strong>
        <p>막연히 "앱 만들어줘"보다<br>
        <em>"로그인 화면, 이메일/비밀번호 입력, 에러 메시지 포함, 모바일 대응"</em>처럼
        목적·제약·완료 기준을 적으면 결과가 확 좋아집니다.</p>
      </div>

      <div class="study-example">
        <strong>📌 비유</strong>
        <p>AI는 빠른 조수, 나는 감독입니다. 조수가 대본을 써도
        <strong>최종 컷은 감독이 확인</strong>해야 합니다.</p>
      </div>

      <div class="study-takeaway">
        <strong>🧠 한 줄 암기</strong>
        <p>사람은 문법 암기가 아니라 <strong>기획·판단·검증</strong>에 집중한다.</p>
      </div>
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
          "핵심은 AI에게 맡기고 끝이 아니라, 사람이 의도를 지시하고 결과물을 검증하는 '디렉팅'입니다. 문법 암기보다 판단력이 중요합니다.",
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
          "누구나 자연어로 소프트웨어를 만들 수 있게 하는 '코딩의 민주화'가 핵심 가치입니다.",
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
          "4요소는 Vibe, Natural Language, AI, Human입니다. Computer는 도구일 뿐 핵심 요소로 보지 않습니다.",
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
          "인간은 AI에게 의도를 전달하고 결과물을 검증하는 감독관(Director)입니다. AI의 보조자가 아니라 지휘자입니다.",
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
          "구현 디테일보다 무엇을 만들지(기획), 결과가 맞는지(판단·검증)에 집중합니다.",
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
      <div class="study-hero">🎯 이 단원에서 얻는 것</div>
      <p class="study-lead">AI에게 제대로 시키려면, 앱이 어떻게 돌아가는지 큰 그림을 알아야 합니다.</p>

      <h3>개발 4대 요소 (식당 비유)</h3>
      <ul class="study-list">
        <li><strong>프론트엔드</strong> = 홀/메뉴판 — 손님이 보는 화면</li>
        <li><strong>백엔드</strong> = 주방 — 실제 요리(로직·처리)</li>
        <li><strong>API</strong> = 웨이터 — 주문 전달과 음식 서빙</li>
        <li><strong>데이터베이스</strong> = 냉장고/창고 — 재료(데이터) 보관</li>
      </ul>

      <div class="study-example">
        <strong>📌 로그인 예로 이해하기</strong>
        <p>1) 프론트: 이메일·비밀번호 입력창<br>
        2) API: "이 계정 맞아?" 요청 전달<br>
        3) 백엔드: 검증 로직 실행<br>
        4) DB: 회원 정보 조회</p>
      </div>

      <div class="study-tip">
        <strong>💡 실전 TIP</strong>
        <p>AI에게 요청할 때 <em>"프론트만 / API 포함 / DB 스키마까지"</em>처럼
        범위를 지정하면 쓸데없는 코드가 줄어듭니다.</p>
      </div>

      <div class="study-mistake">
        <strong>⚠️ 자주 하는 실수</strong>
        <p>"전부 다 만들어줘"만 치면 AI가 범위를 오해합니다.
        화면인지, 서버인지, 저장인지 나눠서 지시하세요.</p>
      </div>

      <div class="study-takeaway">
        <strong>🧠 한 줄 암기</strong>
        <p>화면(FE) · 로직(BE) · 전달(API) · 저장(DB) — 이 네 칸만 기억!</p>
      </div>
    `,
    questions: [
      {
        question: "사용자가 직접 보고 조작하는 화면을 담당하는 영역은?",
        choices: ["백엔드", "프론트엔드", "데이터베이스", "API"],
        answer: 1,
        explanation:
          "프론트엔드는 버튼, 입력창, 레이아웃처럼 사용자 화면과 상호작용을 담당합니다.",
      },
      {
        question: "실제 데이터 처리와 비즈니스 로직을 담당하는 영역은?",
        choices: ["프론트엔드", "UI", "백엔드", "디자인"],
        answer: 2,
        explanation:
          "백엔드는 서버에서 계산·권한·데이터 처리 같은 핵심 로직을 수행합니다.",
      },
      {
        question: "개발 요소 비유 중 '홀과 주방을 오가는 웨이터'에 해당하는 것은?",
        choices: ["프론트엔드", "백엔드", "데이터베이스", "API"],
        answer: 3,
        explanation:
          "API는 프론트의 요청을 백엔드에 전달하고 결과를 다시 가져다주는 메신저입니다.",
      },
      {
        question: "회원 정보나 게시글 같은 데이터를 저장하는 곳은?",
        choices: ["API", "프론트엔드", "데이터베이스", "캐시만"],
        answer: 2,
        explanation:
          "데이터베이스는 데이터를 체계적으로 저장하고 필요할 때 꺼내 쓰는 창고입니다.",
      },
      {
        question: "AI에게 '로그인 화면을 만들어줘'라고 할 때 주로 다루는 영역은?",
        choices: ["데이터베이스 스키마만", "프론트엔드 UI", "서버 인프라만", "네트워크 장비"],
        answer: 1,
        explanation:
          "화면·폼·버튼은 프론트엔드 UI 영역입니다. 서버/DB는 별도 지시가 필요합니다.",
      },
    ],
  },
  "핵심 용어": {
    summary: `
      <div class="study-hero">🎯 이 단원에서 얻는 것</div>
      <p class="study-lead">바이브 코딩 대화에 꼭 나오는 용어를 '쓸 수 있게' 익힙니다.</p>

      <h3>필수 용어 치트시트</h3>
      <ul class="study-list">
        <li><strong>LLM</strong> — AI의 두뇌 (Claude, GPT, Gemini)</li>
        <li><strong>Prompt</strong> — AI에게 내리는 지시문</li>
        <li><strong>Context</strong> — 답에 필요한 배경 정보</li>
        <li><strong>Context Window</strong> — 한 번에 넣을 수 있는 정보량 한도</li>
        <li><strong>Hallucination</strong> — 거짓을 진짜처럼 말하는 현상</li>
        <li><strong>Prompt Engineering</strong> — 지시를 더 정확히 다듬는 기술</li>
      </ul>

      <div class="study-example">
        <strong>📌 좋은 프롬프트 뼈대</strong>
        <pre class="study-code">목표: 무엇을 만들지
제약: 기술/금지사항
예시: 원하는 결과 샘플
완료 기준: 언제 끝인지</pre>
      </div>

      <div class="study-tip">
        <strong>💡 실전 TIP</strong>
        <p>컨텍스트가 부족하면 AI가 추측합니다.
        파일 구조, 에러 메시지, 원하는 UX를 같이 주세요.</p>
      </div>

      <div class="study-mistake">
        <strong>⚠️ 할루시네이션 대응</strong>
        <p>그럴듯해도 바로 믿지 마세요.
        <strong>실행 → 화면 확인 → 에러 로그 확인</strong>이 기본 방어입니다.</p>
      </div>

      <div class="study-takeaway">
        <strong>🧠 한 줄 암기</strong>
        <p>좋은 답 = 좋은 프롬프트 + 충분한 컨텍스트 + 사람의 검증</p>
      </div>
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
          "프롬프트는 AI가 수행할 작업을 자연어로 지시하는 문장입니다. 바이브 코딩의 기본 무기입니다.",
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
          "할루시네이션은 AI가 잘못된 정보를 자신 있게 생성하는 현상입니다. 그래서 검증이 필수입니다.",
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
          "컨텍스트는 AI가 올바른 답을 내기 위해 필요한 배경 정보입니다. 파일, 규칙, 이전 대화가 포함됩니다.",
      },
      {
        question: "다음 중 LLM(거대 언어 모델)의 예시로 적절한 것은?",
        choices: ["Photoshop", "MySQL", "Claude / GPT / Gemini", "React"],
        answer: 2,
        explanation:
          "Claude, GPT, Gemini가 대표적 LLM입니다. Photoshop/MySQL/React는 LLM이 아닙니다.",
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
          "프롬프트 엔지니어링은 목표·제약·예시를 넣어 지시를 정교하게 만드는 기술입니다.",
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
          "컨텍스트 윈도우는 모델이 한 번에 처리할 수 있는 입력 분량의 한계입니다. 넘치면 앞내용을 잊습니다.",
      },
    ],
  },
  "실전 도구": {
    summary: `
      <div class="study-hero">🎯 이 단원에서 얻는 것</div>
      <p class="study-lead">실제로 손에 잡히는 도구와 '언제 무엇을 쓰는지'를 정리합니다.</p>

      <div class="tool-card">
        <h4>1. Cursor</h4>
        <p>AI 통합 코드 에디터.<br>
        <strong>Agent</strong>: 여러 파일 작업 ·
        <strong>Chat</strong>: 질문/수정 ·
        <strong>Tab</strong>: 자동 완성</p>
      </div>
      <div class="tool-card">
        <h4>2. Claude Code</h4>
        <p>터미널에서 파일을 찾고, 고치고, 명령까지 실행하는 에이전트형 도구.</p>
      </div>
      <div class="tool-card">
        <h4>3. Rules / MCP</h4>
        <p><strong>Rules</strong>: "우리 프로젝트는 이렇게 해" 사전 규칙<br>
        <strong>MCP</strong>: AI를 DB·캘린더·슬랙 등 외부 도구와 연결</p>
      </div>

      <div class="study-tip">
        <strong>💡 언제 뭘 쓰지?</strong>
        <p>· 빠르게 코드 이어쓰기 → <strong>Tab</strong><br>
        · 기능 하나를 여러 파일에 → <strong>Agent</strong><br>
        · 터미널에서 조사·수정·실행 → <strong>Claude Code</strong><br>
        · 팀 규칙 고정 → <strong>Rules</strong></p>
      </div>

      <div class="study-example">
        <strong>📌 Rules 예시</strong>
        <pre class="study-code">- 한국어 UI 문구 사용
- 인라인 스타일 금지
- 변경 전 관련 파일 먼저 검색
- 테스트 없이 배포 금지</pre>
      </div>

      <div class="study-takeaway">
        <strong>🧠 한 줄 암기</strong>
        <p>에디터(Cursor) + 에이전트 + Rules/MCP = 바이브 코딩 실전 세트</p>
      </div>
    `,
    questions: [
      {
        question: "VS Code 계열로 널리 쓰이는 AI 통합 코드 에디터는?",
        choices: ["IntelliJ만", "Cursor", "Sublime Text만", "메모장"],
        answer: 1,
        explanation:
          "Cursor는 AI가 깊게 통합된 에디터로, 바이브 코딩 입문자에게 가장 흔한 출발점입니다.",
      },
      {
        question:
          "Cursor에서 여러 파일을 넘나들며 작업을 맡기는 에이전트형 기능에 가까운 것은?",
        choices: ["Tab만", "Agent(에이전트)", "폰트 설정", "테마 변경"],
        answer: 1,
        explanation:
          "Agent는 프로젝트 단위로 파일을 찾고 수정하는 자율 작업에 가깝습니다. Tab은 한 줄 자동완성에 가깝습니다.",
      },
      {
        question: "터미널에서 대화하듯 코드를 고치고 명령을 실행하는 도구는?",
        choices: ["Photoshop", "Claude Code", "Excel", "Figma만"],
        answer: 1,
        explanation:
          "Claude Code는 터미널 기반 에이전트로 탐색·수정·실행 루프를 돕습니다.",
      },
      {
        question: "코드 작성 중 회색 제안으로 이어 쓰는 Cursor 기능은?",
        choices: ["Tab", "Git Merge", "Docker", "DNS"],
        answer: 0,
        explanation:
          "Tab은 회색 자동완성 제안을 받아 빠르게 코드를 이어 쓰는 기능입니다.",
      },
      {
        question: "프로젝트마다 AI가 따라야 할 코딩 규칙을 미리 적어 두는 것은?",
        choices: ["Rules(룰)", "스크린샷만", "배경화면", "북마크만"],
        answer: 0,
        explanation:
          "Rules는 스타일·금지사항·컨벤션을 AI에게 미리 알려 결과 품질을 안정시킵니다.",
      },
      {
        question: "AI를 캘린더·DB·슬랙 같은 외부 도구와 연결하는 표준에 가까운 것은?",
        choices: ["CSS", "MCP (Model Context Protocol)", "JPEG", "HDMI"],
        answer: 1,
        explanation:
          "MCP는 AI가 외부 데이터·도구와 상호작용하도록 돕는 연결 표준입니다.",
      },
    ],
  },
  "심화 개념": {
    summary: `
      <div class="study-hero">🎯 이 단원에서 얻는 것</div>
      <p class="study-lead">사고 안 치고 오래 가는 바이브 코더의 '안전장치'를 배웁니다.</p>

      <h3>세 가지 안전장치</h3>
      <ul class="study-list">
        <li><strong>Git</strong> — 세이브 포인트. 망가져도 되돌림</li>
        <li><strong>MCP</strong> — AI에 팔·다리를 달아 외부 연결</li>
        <li><strong>RAG</strong> — 오픈북. 최신/비공개 문서를 검색해 답변</li>
      </ul>

      <div class="study-example">
        <strong>📌 Git을 쓰는 최소 루틴</strong>
        <pre class="study-code">1) 작업 전 commit (세이브)
2) AI에게 큰 변경 요청
3) 실행·확인
4) 괜찮으면 commit / 아니면 restore</pre>
      </div>

      <div class="study-tip">
        <strong>💡 RAG가 필요한 순간</strong>
        <p>회사 내부 문서, 방금 나온 API 문서처럼
        모델이 모르는 정보를 붙여줘야 할 때 사용합니다.</p>
      </div>

      <div class="study-mistake">
        <strong>⚠️ 절대 금지</strong>
        <p>AI 코드를 검증 없이 바로 배포하기.
        "그럴듯함"과 "동작함"은 다릅니다.</p>
      </div>

      <div class="study-takeaway">
        <strong>🧠 한 줄 암기</strong>
        <p>Git으로 보호하고, MCP로 연결하고, RAG로 근거를 채우고, 항상 검증하라.</p>
      </div>
    `,
    questions: [
      {
        question:
          "게임의 '세이브 포인트'처럼 코드를 저장하고 복구할 수 있게 해주는 도구는?",
        choices: ["Backup 폴더만", "Git", "스크린샷", "이메일 임시보관"],
        answer: 1,
        explanation:
          "Git은 변경 이력을 남겨 이전 상태로 안전하게 되돌릴 수 있는 버전 관리 도구입니다.",
      },
      {
        question:
          "AI에게 '팔과 다리'를 달아 외부 도구와 연결하는 표준 규격은?",
        choices: ["REST만", "SDK만", "MCP (Model Context Protocol)", "USB"],
        answer: 2,
        explanation:
          "MCP는 AI가 외부 도구·데이터와 상호작용하게 해주는 프로토콜입니다.",
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
          "RAG는 외부 문서를 검색(Retrieval)해 생성(Generation)에 활용하는 '오픈북' 방식입니다.",
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
          "AI 변경은 범위가 커서 실수가 날 수 있습니다. Git이 있으면 언제든 되돌릴 수 있습니다.",
      },
      {
        question: "AI가 만든 코드를 바로 배포하기 전에 먼저 해야 할 일은?",
        choices: [
          "검증(실행·확인)",
          "아무 생각 없이 커밋",
          "규칙 파일 삭제",
          "테스트 끄기",
        ],
        answer: 0,
        explanation:
          "배포 전 실행·화면·에러 확인이 기본입니다. 검증 없는 배포는 사고의 지름길입니다.",
      },
    ],
  },
  프로세스: {
    summary: `
      <div class="study-hero">🎯 이 단원에서 얻는 것</div>
      <p class="study-lead">매일 쓰는 작업 루틴, Vibe Loop를 몸에 붙입니다.</p>

      <h3>Vibe Loop 4단계</h3>
      <ol class="study-steps">
        <li><strong>지시 (Prompt)</strong> — 원하는 기능을 구체적으로 요청</li>
        <li><strong>생성 (Generate)</strong> — AI가 코드 작성</li>
        <li><strong>검증 (Verify)</strong> — 실행·화면·에러 확인</li>
        <li><strong>반복 (Iterate)</strong> — 피드백 주고 개선</li>
      </ol>

      <div class="study-example">
        <strong>📌 약한 지시 vs 강한 지시</strong>
        <pre class="study-code">❌ 버튼 예쁘게 만들어줘
✅ 회원가입 버튼: 가로 100%, 높이 48px,
   비활성 시 회색, 클릭 시 로딩 표시,
   접근성 label 포함</pre>
      </div>

      <div class="study-tip">
        <strong>💡 검증 체크리스트</strong>
        <p>☑ 실행이 되는가?<br>
        ☑ 화면이 의도대로인가?<br>
        ☑ 에러 로그가 없는가?<br>
        ☑ 경계 상황(빈 값, 모바일)을 봤는가?</p>
      </div>

      <div class="study-mistake">
        <strong>⚠️ 초보가 빠지는 함정</strong>
        <p>한 번에 완벽한 결과를 기대하기.
        바이브 코딩은 <strong>짧은 루프를 여러 번</strong> 도는 스포츠입니다.</p>
      </div>

      <div class="study-takeaway">
        <strong>🧠 한 줄 암기</strong>
        <p>지시 → 생성 → 검증 → 반복. 검증 없는 생성은 학습이 아니라 도박.</p>
      </div>
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
          "Verify는 결과물이 의도대로 도는지 확인하는 단계입니다. 여기서 학습과 품질이 갈립니다.",
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
          "Vibe Loop의 정석은 지시 → 생성 → 검증 → 반복입니다.",
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
          "'알아서 잘해줘'는 최악의 지시입니다. 목표·제약·예시·완료 기준을 적으세요.",
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
          "실행과 화면·에러 확인이 검증의 기본입니다. 최종 책임은 사람에게 있습니다.",
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
          "틀린 점을 구체적으로 피드백하고 다시 생성하는 반복이 바이브 코딩의 실력입니다.",
      },
    ],
  },
};
