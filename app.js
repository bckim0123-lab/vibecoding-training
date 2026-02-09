// 퀴즈 데이터 (직접 포함)
let quizData = [
  {
    id: 1,
    question: "바이브 코딩(Vibe Coding)의 핵심 철학을 가장 잘 나타내는 문장은?",
    options: [
      "코딩(Coding)은 정교한 문법 학습에서 시작된다.",
      "코딩(Coding)하지 말고, 디렉팅(Directing)하라.",
      "모든 개발자는 C언어부터 마스터해야 한다.",
      "AI는 단순한 보조 도구일 뿐이다.",
    ],
    answer: 1,
    explanation:
      "바이브 코딩은 자연어로 AI에게 지시를 내리고 결과물을 관리하는 '디렉팅' 중심의 개발 패러다임입니다.",
  },
  {
    id: 2,
    question:
      "바이브 코딩 시대에 '디렉터(Director)'에게 가장 필요한 역량이 아닌 것은?",
    options: [
      "논리적 사고력",
      "프롬프트를 통한 소통 능력",
      "결과물을 판단하는 눈(Vibe)",
      "복잡한 문법의 완벽한 암기",
    ],
    answer: 3,
    explanation:
      "바이브 코딩에서는 문법 암기보다 논리적 사고, 소통, 판단력이 더 중요합니다.",
  },
  {
    id: 3,
    question: "개발 요소 비유 중 '홀과 주방을 오가는 웨이터'에 해당하는 것은?",
    options: ["프론트엔드", "백엔드", "API", "데이터베이스"],
    answer: 2,
    explanation:
      "API는 프론트엔드(손님)의 요청을 백엔드(주방)에 전달하고 결과를 다시 가져다주는 메신저 역할을 합니다.",
  },
  {
    id: 4,
    question:
      "AI가 사실이 아닌 정보를 진실인 것처럼 대답하는 현상을 무엇이라고 하나요?",
    options: [
      "컨텍스트(Context)",
      "할루시네이션(Hallucination)",
      "프롬프트 엔지니어링",
      "RAG",
    ],
    answer: 1,
    explanation:
      "할루시네이션(환각)은 AI가 허위 정보를 생성하는 현상으로, 반드시 검증이 필요합니다.",
  },
  {
    id: 5,
    question:
      "커서(Cursor)에서 여러 파일을 동시에 생성하고 수정하며 프로젝트 전체를 관장하는 기능은?",
    options: [
      "Tab (탭)",
      "Chat (채팅)",
      "Composer (컴포저)",
      "Terminal (터미널)",
    ],
    answer: 2,
    explanation:
      "Composer(Ctrl+I)는 AI가 여러 파일을 동시에 다루며 프로젝트 전체를 관리할 수 있게 해주는 강력한 기능입니다.",
  },
  {
    id: 6,
    question:
      "앤스로픽에서 만든 도구로, 터미널에서 자율적으로 코드를 고치고 명령어를 실행하는 것은?",
    options: ["Claude Code", "ChatGPT", "Google Antigravity", "VS Code"],
    answer: 0,
    explanation:
      "Claude Code는 터미널 기반의 AI 도구로, 스스로 파일을 찾고 에러를 고치는 Agentic Workflow를 수행합니다.",
  },
  {
    id: 7,
    question:
      "코드가 망가졌을 때 이전 상태로 되돌릴 수 있는 '세이브 포인트' 역할을 하는 도구는?",
    options: ["MCP", "Git", "RAG", "LLM"],
    answer: 1,
    explanation:
      "Git은 버전 관리 시스템으로, 실수가 발생했을 때 안전하게 이전 상태로 되돌려주는 안전장치입니다.",
  },
  {
    id: 8,
    question:
      "AI에게 '팔과 다리'를 달아주어 외부 세상(구글 캘린더, 슬랙 등)과 연결하는 표준 규격은?",
    options: ["API", "HTTP", "MCP (Model Context Protocol)", "JSON"],
    answer: 2,
    explanation:
      "MCP는 닫혀 있는 AI 모델을 외부 앱이나 데이터베이스와 연결해주는 표준 규격입니다.",
  },
  {
    id: 9,
    question:
      "AI가 학습하지 않은 최신 문서나 회사 비공개 문서를 '오픈북'처럼 참조하게 만드는 기술은?",
    options: [
      "RAG (Retrieval-Augmented Generation)",
      "Fine-tuning",
      "Prompting",
      "Context Injection",
    ],
    answer: 0,
    explanation:
      "RAG는 외부 정보를 검색하여 AI의 답변 정확도를 높이는 '검색 증강 생성' 기술입니다.",
  },
  {
    id: 10,
    question:
      "바이브 코딩 프로세스(Vibe Loop)의 3단계로, AI가 짠 코드를 실행해보고 확인하는 단계는?",
    options: [
      "지시 (Prompt)",
      "생성 (Generate)",
      "검증 (Verify)",
      "반복 (Iterate)",
    ],
    answer: 2,
    explanation:
      "검증(Verify) 단계에서는 AI가 생성한 결과물이 의도대로 작동하는지, 에러는 없는지 체크합니다.",
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionNumber = document.getElementById("question-number");
const progressBar = document.getElementById("progress-bar");
const progressPercentage = document.getElementById("progress-percentage");
const feedback = document.getElementById("feedback");
const feedbackIconWrapper = document.getElementById("feedback-icon-wrapper");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackMessage = document.getElementById("feedback-message");
const explanationText = document.getElementById("explanation-text");
const finalScore = document.getElementById("final-score");
const instructorText = document.getElementById("instructor-text");
const cssRobot = document.getElementById("css-robot");

// ===== 파티클 배경 애니메이션 =====
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // 연결선 그리기
  particles.forEach((particleA, indexA) => {
    particles.slice(indexA + 1).forEach((particleB) => {
      const dx = particleA.x - particleB.x;
      const dy = particleA.y - particleB.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.2 * (1 - distance / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particleA.x, particleA.y);
        ctx.lineTo(particleB.x, particleB.y);
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== 3D 틸트 효과 (로봇) =====
if (cssRobot) {
  cssRobot.addEventListener("mousemove", (e) => {
    const rect = cssRobot.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    cssRobot.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
  });

  cssRobot.addEventListener("mouseleave", () => {
    cssRobot.style.transform = "";
  });
}

// ===== 3D 카드 효과 =====
const cards = document.querySelectorAll(".card-3d");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
  });
});

// ===== 버튼 리플 효과 =====
startBtn.addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple-effect");
  this.appendChild(ripple);

  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  setTimeout(() => ripple.remove(), 600);
});

// ===== 퀴즈 초기화 =====
function initQuiz() {
  console.log("✅ 퀴즈 데이터 로드 완료:", quizData.length, "문제");
}

// ===== 퀴즈 시작 =====
function startQuiz() {
  if (!quizData || quizData.length === 0) {
    alert("퀴즈 데이터를 불러올 수 없습니다. 페이지를 새로고침 해주세요.");
    return;
  }

  currentQuestionIndex = 0;
  score = 0;

  // 화면 전환 애니메이션
  startScreen.style.animation = "screen-fade-out 0.5s ease forwards";

  setTimeout(() => {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
  }, 500);
}

// ===== 질문 표시 =====
function showQuestion() {
  const question = quizData[currentQuestionIndex];
  const percentage = Math.round(
    ((currentQuestionIndex + 1) / quizData.length) * 100,
  );

  questionNumber.innerText = `문제 ${currentQuestionIndex + 1}/10`;
  progressPercentage.innerText = `${percentage}%`;
  progressBar.style.width = `${percentage}%`;

  // 질문 표시
  questionText.innerText = question.question;

  // 옵션 버튼 생성
  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.innerHTML = `
      <span class="option-idx">${String.fromCharCode(65 + index)}</span>
      <span>${option}</span>
    `;
    button.addEventListener("click", () => selectOption(index));
    optionsContainer.appendChild(button);
  });

  feedback.classList.add("hidden");
  nextBtn.innerHTML =
    currentQuestionIndex === quizData.length - 1
      ? '<span>결과 보기</span><span class="arrow">→</span>'
      : '<span>다음 문제</span><span class="arrow">→</span>';
}

// ===== 옵션 선택 =====
function selectOption(index) {
  const question = quizData[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".option-btn");

  // 모든 버튼 비활성화
  buttons.forEach((btn) => (btn.style.pointerEvents = "none"));

  if (index === question.answer) {
    score++;
    buttons[index].classList.add("correct");
    feedbackIcon.innerText = "✅";
    feedbackMessage.innerText = "정답입니다! 🎉";
    feedbackMessage.style.color = "var(--success)";

    // 성공 애니메이션
    createConfetti();

    if (typeof gsap !== "undefined" && cssRobot) {
      gsap.to(cssRobot, {
        rotation: 360,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // 눈 깜빡임
      const eyes = document.querySelectorAll(".eye");
      eyes.forEach((eye) => {
        gsap.to(eye, {
          scaleY: 0.1,
          duration: 0.1,
          yoyo: true,
          repeat: 3,
        });
      });
    }
  } else {
    buttons[index].classList.add("wrong");
    buttons[question.answer].classList.add("correct");
    feedbackIcon.innerText = "❌";
    feedbackMessage.innerText = "아쉽네요...";
    feedbackMessage.style.color = "var(--error)";

    // 실패 애니메이션
    if (typeof gsap !== "undefined" && cssRobot) {
      gsap.to(cssRobot, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        onComplete: () => gsap.set(cssRobot, { x: 0 }),
      });

      // 볼 깜빡임
      const cheeks = document.querySelectorAll(".robot-cheek");
      cheeks.forEach((cheek) => {
        gsap.to(cheek, {
          opacity: 1,
          scale: 1.3,
          duration: 0.2,
          yoyo: true,
          repeat: 3,
        });
      });
    }
  }

  explanationText.innerText = question.explanation;
  feedback.classList.remove("hidden");
}

// ===== 컨페티 효과 =====
function createConfetti() {
  const confettiCount = 50;
  const colors = ["#00e5ff", "#7000ff", "#ff1493", "#fbbf24", "#10b981"];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    document.body.appendChild(confetti);

    const duration = Math.random() * 3 + 2;
    const targetX = Math.random() * 200 - 100;
    const rotation = Math.random() * 720;

    if (typeof gsap !== "undefined") {
      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: targetX,
        rotation: rotation,
        opacity: 0,
        duration: duration,
        ease: "power2.out",
        onComplete: () => confetti.remove(),
      });
    } else {
      setTimeout(() => confetti.remove(), duration * 1000);
    }
  }
}

// ===== 다음 질문 =====
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ===== 비디오 컨트롤러 시스템 =====
class VideoController {
  constructor() {
    this.overlay = document.getElementById("video-overlay");
    this.introVideo = document.getElementById("intro-video");
    this.passVideo = document.getElementById("pass-video");
    this.failVideo = document.getElementById("fail-video");
    this.skipBtn = document.getElementById("skip-btn");
    // this.errorMsg = document.getElementById("video-error-msg"); // 제거됨
    this.enterBtn = document.getElementById("enter-btn");
    this.introOverlay = document.getElementById("intro-overlay");
    this.robot = document.getElementById("css-robot");
    this.robotParent = this.robot ? this.robot.parentElement : null;
    this.videoContainer = document.querySelector(".video-container");

    this.currentVideo = null;
    this.isPlaying = false;

    this.init();
  }

  init() {
    // 입장 버튼 이벤트 (인트로 시작)
    if (this.enterBtn) {
      this.enterBtn.addEventListener("click", () => {
        this.introOverlay.classList.add("hidden");
        // 오버레이가 사라지는 애니메이션과 동시에 비디오 재생 시작 (사용자 인터랙션 유지)
        this.playVideo("intro");
      });
    }

    // 스킵 버튼 이벤트
    this.skipBtn.addEventListener("click", () => this.skipVideo());

    // 비디오 오류 처리
    [this.introVideo, this.passVideo, this.failVideo].forEach((video) => {
      if (video) {
        video.addEventListener("error", (e) => this.handleError(e));
        video.addEventListener("ended", () => this.handleVideoEnd());
      }
    });

    // 기존 자동 재생 제거
  }

  playVideo(type) {
    if (this.isPlaying) this.stopVideo();

    // 메인 컨테이너 숨기기 및 스크롤 방지
    const container = document.querySelector(".container");
    if (container) container.style.opacity = "0";
    document.body.style.overflow = "hidden";

    this.overlay.classList.remove("hidden");

    // 인트로 비디오가 아닐 때만 로봇 이동 (사용자 요청: 인트로 영상에서 로봇 제거)
    if (type !== "intro") {
      this.moveRobotToOverlay();
    } else {
      // 인트로일 경우 로봇 완전히 숨김 (이중 안전장치)
      if (this.robot) this.robot.style.display = "none";
    }

    // 모든 비디오 숨기기
    [this.introVideo, this.passVideo, this.failVideo].forEach((v) => {
      v.classList.add("hidden");
      v.pause();
      v.currentTime = 0;
    });

    // 선택된 비디오 설정
    switch (type) {
      case "intro":
        this.currentVideo = this.introVideo;
        this.skipBtn.classList.remove("hidden");
        break;
      case "pass":
        this.currentVideo = this.passVideo;
        this.skipBtn.classList.add("hidden");
        break;
      case "fail":
        this.currentVideo = this.failVideo;
        this.skipBtn.classList.add("hidden");
        break;
    }

    if (this.currentVideo) {
      this.currentVideo.classList.remove("hidden");
      this.currentVideo.muted = false; // 소리 활성화

      const playPromise = this.currentVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay error:", error);
          // 사용자 인터랙션 후 호출되므로 에러 발생 확률 낮음
          // 만약 에러 발생 시 음소거로 시도하지 않고 오류 메시지 표시
          this.handleError(error);
        });
      }

      this.isPlaying = true;
      if (type !== "intro") {
        this.startRobotMonitoring();
      }
    }
  }

  stopVideo() {
    if (this.currentVideo) {
      this.currentVideo.pause();
      this.currentVideo.classList.add("hidden");
    }

    // 메인 컨테이너 복구 및 스크롤 복구
    const container = document.querySelector(".container");
    if (container) container.style.opacity = "1";
    document.body.style.overflow = "";

    this.overlay.classList.add("hidden");
    this.isPlaying = false;
    this.restoreRobot();

    // 로봇 강제 표시 (인트로에서 숨겼을 수 있으므로 복구)
    if (this.robot) {
      this.robot.style.display = "";
    }

    this.stopRobotMonitoring();
  }

  skipVideo() {
    // 로봇 반응: 경고/고개 흔들기
    this.triggerRobotReaction("warning");

    // 페이드 아웃 효과
    this.overlay.style.opacity = "0";
    setTimeout(() => {
      this.stopVideo();
      this.overlay.style.opacity = "1";
      // 인트로 스킵 후 메인 화면 활성화
      if (
        startScreen &&
        !startScreen.classList.contains("active") &&
        !quizScreen.classList.contains("active")
      ) {
        startScreen.classList.add("active");
      }
    }, 500);
  }

  handleVideoEnd() {
    // 2초 대기 후 다음 단계
    setTimeout(() => {
      // 로봇 반응: 축하/위로 (영상 타입에 따라)
      if (this.currentVideo === this.passVideo) {
        this.triggerRobotReaction("happy");
      } else if (this.currentVideo === this.failVideo) {
        this.triggerRobotReaction("sad");
      }

      // 페이드 아웃 및 종료
      this.overlay.style.opacity = "0";
      setTimeout(() => {
        this.stopVideo();
        this.overlay.style.opacity = "1";

        // 인트로 종료 시
        if (this.currentVideo === this.introVideo) {
          // 이미 메인 화면에 있음
        }
        // 합격/불합격 종료 시 -> 결과 화면은 showResult에서 이미 처리됨, 여기서는 오버레이만 닫음
        if (
          this.currentVideo === this.passVideo ||
          this.currentVideo === this.failVideo
        ) {
          resultScreen.classList.add("active");
        }
      }, 500);
    }, 2000);
  }

  handleError(e) {
    console.error("Video Error:", e);
    // 경고 문구 UI 표시 제거 (사용자 요청)
    // this.errorMsg.classList.remove("hidden");

    // 3초 후 자동 스킵 (에러 발생 시 사용자 경험 저하 방지)
    setTimeout(() => {
      // this.errorMsg.classList.add("hidden");
      this.skipVideo();
    }, 1000); // 대기 시간 단축
  }

  // 로봇 위치 이동 (오버레이로)
  moveRobotToOverlay() {
    if (
      this.robot &&
      this.videoContainer &&
      this.robot.parentElement !== this.videoContainer
    ) {
      // 래퍼 생성 (스케일 조정을 위해)
      this.robotWrapper = document.createElement("div");
      this.robotWrapper.style.position = "absolute";
      this.robotWrapper.style.left = "5%";
      this.robotWrapper.style.bottom = "5%";
      this.robotWrapper.style.zIndex = "10001";
      this.robotWrapper.style.transform = "scale(0.8)"; // 여기서 스케일 조정
      this.robotWrapper.style.transformOrigin = "bottom left";

      this.videoContainer.appendChild(this.robotWrapper);

      this.originalRobotStyle = this.robot.style.cssText;
      this.robotWrapper.appendChild(this.robot);
    }
  }

  // 로봇 원위치 복귀
  restoreRobot() {
    if (
      this.robot &&
      this.robotParent &&
      this.robot.parentElement !== this.robotParent
    ) {
      this.robotParent.appendChild(this.robot);
      this.robot.style.cssText = this.originalRobotStyle || "";

      // 래퍼 제거
      if (this.robotWrapper) {
        this.robotWrapper.remove();
        this.robotWrapper = null;
      }
    }
  }

  // 로봇 감시 애니메이션
  startRobotMonitoring() {
    if (!this.robot) return;

    this.monitoringInterval = setInterval(() => {
      const eyes = this.robot.querySelectorAll(".eye");
      // 랜덤 시선 이동
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;

      eyes.forEach((eye) => {
        eye.style.transform = `translate(${x}px, ${y}px)`;
      });

      setTimeout(() => {
        eyes.forEach((eye) => {
          eye.style.transform = "";
        });
      }, 1000);
    }, 3000);
  }

  stopRobotMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    // 눈 위치 초기화
    if (this.robot) {
      const eyes = this.robot.querySelectorAll(".eye");
      eyes.forEach((eye) => {
        eye.style.transform = "";
      });
    }
  }

  triggerRobotReaction(type) {
    if (!this.robot) return;

    const head = this.robot.querySelector(".robot-head");
    if (!head) return;

    // 기존 애니메이션 클래스 제거
    head.classList.remove(
      "robot-shake-anim",
      "robot-nod-anim",
      "robot-tilt-anim",
    );

    // 리플로우 강제
    void head.offsetWidth;

    switch (type) {
      case "warning": // 스킵 시 고개 젓기
        head.classList.add("robot-shake-anim");
        setTimeout(() => head.classList.remove("robot-shake-anim"), 1000);
        break;
      case "happy": // 합격 시 끄덕이기
        head.classList.add("robot-nod-anim");
        break;
      case "sad": // 불합격 시 갸웃거리기
        head.classList.add("robot-tilt-anim");
        break;
    }
  }
}

// 비디오 컨트롤러 인스턴스 생성
const videoController = new VideoController();

// ===== 결과 표시 (수정) =====
function showResult() {
  quizScreen.classList.remove("active");
  // resultScreen.classList.add('active'); // 비디오 재생 후 표시로 변경

  const calculatedScore = Math.round((score / quizData.length) * 100);

  // 합격/불합격 여부에 따라 비디오 재생
  if (calculatedScore >= 80) {
    videoController.playVideo("pass");
  } else {
    videoController.playVideo("fail");
  }

  // 점수 애니메이션 및 결과 화면 설정 (비디오 종료 후 보여질 내용 미리 준비)
  let currentScore = 0;
  const scoreInterval = setInterval(() => {
    if (currentScore >= calculatedScore) {
      clearInterval(scoreInterval);
    } else {
      currentScore++;
      finalScore.innerText = currentScore;
    }
  }, 20);

  // SVG 원 애니메이션
  const scoreCircle = document.getElementById("score-circle");
  if (scoreCircle) {
    const circumference = 2 * Math.PI * 100;
    const offset = circumference - (calculatedScore / 100) * circumference;
    setTimeout(() => {
      scoreCircle.style.strokeDashoffset = offset;
    }, 100);
  }

  // 합격/불합격 판정 및 피드백 메시지
  let message = "";
  let resultBadge = document.querySelector(".result-badge");
  let resultTitle = document.querySelector(".result-title");

  if (calculatedScore >= 80) {
    // 합격
    if (resultBadge) resultBadge.innerText = "🎉";
    if (resultTitle) resultTitle.innerText = "합격!";

    if (calculatedScore === 100) {
      message =
        "완벽합니다! 🎉 당신은 이미 전설적인 바이브 코딩 마스터입니다. 모든 개념을 완벽하게 이해하고 계시네요!";
    } else {
      message =
        "훌륭합니다! 👏 바이브 코딩의 핵심 역량을 충분히 갖추고 계시네요. 실전 프로젝트에 바로 투입 가능합니다!";
    }

    // 축하 효과
    setTimeout(() => createConfetti(), 500);
  } else {
    // 불합격
    if (resultBadge) resultBadge.innerText = "😢";
    if (resultTitle) resultTitle.innerText = "다시 도전하세요!";

    if (calculatedScore >= 60) {
      message =
        "아쉽네요! 조금만 더 노력하면 합격할 수 있습니다. 80점 이상이 합격 기준입니다. 다시 도전해보세요!";
    } else {
      message =
        "아직 보완이 필요합니다. 📚 교육 자료를 다시 한번 살펴보고 재도전해보세요. 80점 이상이 합격입니다!";
    }
  }

  instructorText.innerText = message;
}

// ===== 이벤트 리스너 =====
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", () => {
  // 초기화
  currentQuestionIndex = 0;
  score = 0;

  // 애니메이션 제거하고 화면 전환
  resultScreen.style.animation = "none";
  startScreen.style.animation = "none";

  // 즉시 화면 전환
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");

  // 애니메이션 복구 (다음 전환을 위해)
  setTimeout(() => {
    resultScreen.style.animation = "";
    startScreen.style.animation = "";
  }, 100);
});

// ===== 초기화 =====
initQuiz();
initParticles();
animateParticles();

// ===== 추가 CSS 애니메이션 =====
const style = document.createElement("style");
style.textContent = `
  @keyframes screen-fade-out {
    to {
      opacity: 0;
      transform: scale(0.95) translateY(-30px);
    }
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }

  /* SVG 그라데이션 */
  svg defs {
    display: none;
  }
`;
document.head.appendChild(style);

// SVG 그라데이션 추가
const svg = document.querySelector(".score-circle-svg");
if (svg) {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient",
  );
  gradient.setAttribute("id", "score-gradient");
  gradient.innerHTML = `
    <stop offset="0%" stop-color="#00e5ff" />
    <stop offset="100%" stop-color="#7000ff" />
  `;
  defs.appendChild(gradient);
  svg.insertBefore(defs, svg.firstChild);
}

// ===== 스크롤 애니메이션 (옵션) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fade-in-up 0.6s ease forwards";
    }
  });
}, observerOptions);

// 모듈 카드 관찰
document.querySelectorAll(".module-card").forEach((card) => {
  observer.observe(card);
});

console.log("🚀 바이브코딩 훈련소 초기화 완료!");
