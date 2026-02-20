document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. 상수 및 설정 (Constants & Config)
  // ==========================================================================

  let QUIZ_DATA = [];

  const RANKS = [
    { score: 0, title: "훈련병", color: "#ffffff" },
    { score: 300, title: "이병", color: "#cd7f32" },
    { score: 600, title: "일병", color: "#c0c0c0" },
    { score: 1000, title: "상병", color: "#ffd700" },
    { score: 1500, title: "병장", color: "#00e5ff" },
    { score: 2000, title: "하사", color: "#ff00ff" },
    { score: 2500, title: "소위", color: "#ff4444" },
    { score: 3000, title: "중위", color: "#ff2222" },
    { score: 3500, title: "대위", color: "#ff0000" },
  ];

  // ==========================================================================
  // 2. 상태 관리 (State Management)
  // ==========================================================================

  const GameState = {
    hp: 3,
    maxHp: 3,
    score: 0,
    combo: 0,
    maxCombo: 0,
    currentQuizIndex: 0,
    gameStatus: "IDLE", // IDLE, INTRO, PLAYING, END
    timer: null,
    timeLeft: 15,
    maxTime: 15,
    quizOrder: [],
    skillUsed: false,
    isBossMode: false,
  };

  // ==========================================================================
  // 3. 오디오 및 비디오 관리 (Media Controller) - Web Audio API
  // ==========================================================================

  const SoundManager = {
    audioContext: null,
    bgmOscillators: [],

    init() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
      } catch (e) {
        console.warn("Web Audio API not supported");
      }
    },

    // Oscillator 기반 사운드 생성
    playTone(frequency, type, duration, volume = 0.1) {
      if (!this.audioContext) return;
      const ctx = this.audioContext;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = type;
      osc.frequency.value = frequency;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration,
      );

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    },

    play(name) {
      if (!this.audioContext) this.init();
      if (this.audioContext && this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }

      switch (name) {
        case "bgm":
          // 간단한 앰비언트 배경음 (낮은 드론 사운드 반복)
          if (this.bgmOscillators.length > 0) return; // 이미 재생 중
          this.startBgm();
          break;
        case "hover":
          // 가볍고 짧은 틱 소리
          this.playTone(400, "sine", 0.05, 0.02);
          break;
        case "click":
          // 명확한 선택 소리
          this.playTone(600, "sine", 0.1, 0.05);
          setTimeout(() => this.playTone(800, "sine", 0.1, 0.03), 50);
          break;
        case "start":
          this.playTone(400, "square", 0.1, 0.1);
          setTimeout(() => this.playTone(600, "square", 0.1, 0.1), 100);
          setTimeout(() => this.playTone(800, "square", 0.3, 0.1), 200);
          break;
        case "correct":
          // Major Chord (C-E-G-C) - 밝고 경쾌하게
          this.playTone(523.25, "sine", 0.3, 0.2); // C5
          setTimeout(() => this.playTone(659.25, "sine", 0.3, 0.2), 80); // E5
          setTimeout(() => this.playTone(783.99, "sine", 0.3, 0.2), 160); // G5
          setTimeout(() => this.playTone(1046.5, "sine", 0.6, 0.2), 240); // C6
          break;
        case "wrong":
          // Error Buzz - 낮고 무겁게
          this.playTone(150, "sawtooth", 0.4, 0.15);
          setTimeout(() => this.playTone(100, "sawtooth", 0.4, 0.15), 100);
          break;
        case "levelup":
          // Fanfare
          this.playTone(523.25, "square", 0.1, 0.1);
          setTimeout(() => this.playTone(523.25, "square", 0.1, 0.1), 150);
          setTimeout(() => this.playTone(523.25, "square", 0.1, 0.1), 300);
          setTimeout(() => this.playTone(698.46, "square", 0.8, 0.2), 450); // F5
          break;
        case "timer":
          // 긴박한 틱톡 소리
          this.playTone(800, "triangle", 0.05, 0.05);
          break;
        case "timeout":
          // 시간 초과 경고음
          this.playTone(800, "sawtooth", 0.3, 0.1);
          setTimeout(() => this.playTone(600, "sawtooth", 0.3, 0.1), 150);
          break;
      }
    },

    startBgm() {
      if (!this.audioContext) return;
      // 매우 낮은 볼륨의 앰비언트 드론
      const ctx = this.audioContext;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.value = 110; // A2

      osc2.type = "sine";
      osc2.frequency.value = 164.81; // E3

      gainNode.gain.setValueAtTime(0.02, ctx.currentTime); // 매우 작게

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();

      this.bgmOscillators.push(osc1, osc2);
    },

    stop(name) {
      if (name === "bgm") {
        this.bgmOscillators.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        this.bgmOscillators = [];
      }
    },
  };

  const VideoManager = {
    currentVideo: null,

    play(videoId, onEndCallback) {
      const video = document.getElementById(videoId);
      const overlay = document.getElementById("video-overlay");
      const skipBtn = document.getElementById("skip-btn");

      if (!video || !overlay) return;

      // 이전 비디오 정지 및 모든 비디오 숨김 (안전장치)
      this.stop();

      this.currentVideo = video;
      overlay.classList.remove("hidden");
      video.classList.remove("hidden");

      if (skipBtn) skipBtn.classList.remove("hidden");

      video.currentTime = 0;
      // Promise 오류 처리: 재생 실패 시에도 콜백이 호출되도록 하거나 로그 출력
      video.play().catch((err) => {
        console.error("Video play error:", err);
        // 자동 재생 정책 등으로 실패할 경우, 사용자가 Skip 버튼을 누르도록 유도하거나
        // 상황에 따라 바로 콜백을 호출할 수도 있음.
        // 여기서는 비디오가 안 나와도 진행이 멈추지 않도록 로그만 남김.
      });

      video.onended = () => {
        this.stop();
        if (onEndCallback) onEndCallback();
      };
    },

    stop() {
      // 모든 비디오 요소를 찾아서 숨김 처리 (중첩 방지)
      const allVideos = document.querySelectorAll(".video-player");
      allVideos.forEach((v) => {
        v.pause();
        v.classList.add("hidden");
        v.currentTime = 0;
      });

      this.currentVideo = null;

      const overlay = document.getElementById("video-overlay");
      if (overlay) overlay.classList.add("hidden");
    },

    skip() {
      if (this.currentVideo) {
        this.currentVideo.pause();
        // onended 강제 호출
        if (this.currentVideo.onended) {
          this.currentVideo.onended();
        } else {
          this.stop();
        }
      }
    },
  };

  // ==========================================================================
  // 4. DOM 요소 (DOM Elements)
  // ==========================================================================

  const Screens = {
    start: document.getElementById("start-screen"),
    quiz: document.getElementById("quiz-screen"),
    result: document.getElementById("result-screen"),
  };

  const UI = {
    // Buttons
    startBtn: document.getElementById("start-btn"),
    restartBtn: document.getElementById("restart-btn"),
    shareBtn: document.getElementById("share-btn"),
    enterBtn: document.getElementById("enter-btn"),
    skipBtn: document.getElementById("skip-btn"),
    nextBtn: document.getElementById("next-btn"),
    skillBtn: document.getElementById("skill-btn"),

    // Guide Modal
    guideModal: document.getElementById("game-guide-modal"),
    guideStartBtn: document.getElementById("guide-start-btn"),
    dontShowGuide: document.getElementById("dont-show-guide"),
    guideTimerProgress: document.getElementById("guide-timer-progress"),

    // HUD
    hpHearts: document.getElementById("hp-hearts"),
    score: document.getElementById("current-score"),
    comboContainer: document.getElementById("combo-container"),
    comboCount: document.getElementById("combo-count"),
    timerBar: document.getElementById("timer-bar"),
    timerText: document.getElementById("timer-text"),
    questionNum: document.getElementById("question-number"),

    // Quiz Area
    questionText: document.getElementById("question-text"),
    optionsContainer: document.getElementById("options-container"),
    feedback: document.getElementById("feedback"),
    feedbackMessage: document.getElementById("feedback-message"),
    explanationText: document.getElementById("explanation-text"),
    feedbackIcon: document.getElementById("feedback-icon"),

    // Skill
    skillStatus: document.getElementById("skill-status"),

    // Result Area
    finalScore: document.getElementById("final-score"),
    rankDisplay: document.getElementById("rank-display"),
    instructorText: document.getElementById("instructor-text"),

    // Overlays
    introOverlay: document.getElementById("intro-overlay"),

    // Study Modal
    studyModal: document.getElementById("study-modal"),
    closeStudyBtn: document.getElementById("close-study-btn"),
    studyTitle: document.getElementById("study-title"),
    studyBody: document.getElementById("study-body"),
    studyGrid: document.getElementById("study-grid"),
  };

  // ==========================================================================
  // 5. 게임 로직 (Game Logic)
  // ==========================================================================

  function initGame() {
    SoundManager.init();

    // 화면 꺼짐 방지 (Wake Lock API)
    requestWakeLock();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        requestWakeLock();
      }
    });

    // Event Listeners
    if (UI.enterBtn) UI.enterBtn.addEventListener("click", playIntro);
    if (UI.skipBtn)
      UI.skipBtn.addEventListener("click", () => VideoManager.skip());
    // Start Button -> Show Guide or Start Game
    if (UI.startBtn) UI.startBtn.addEventListener("click", handleStartButton);
    if (UI.guideStartBtn) UI.guideStartBtn.addEventListener("click", startGame);

    if (UI.restartBtn) UI.restartBtn.addEventListener("click", restartGame);
    if (UI.shareBtn) UI.shareBtn.addEventListener("click", shareResult);
    if (UI.nextBtn) UI.nextBtn.addEventListener("click", loadNextQuiz);
    if (UI.skillBtn) UI.skillBtn.addEventListener("click", useSkill);

    // Study Modal Event Listeners
    if (UI.closeStudyBtn) {
      UI.closeStudyBtn.addEventListener("click", closeStudyModal);
    }
    window.addEventListener("click", (e) => {
      if (e.target === UI.studyModal) {
        closeStudyModal();
      }
    });

    // Initialize Study Mode UI
    initStudyMode();

    // Initial State
    if (UI.introOverlay) UI.introOverlay.classList.remove("hidden");

    // Global Button Sound Listeners
    document.addEventListener("mouseover", (e) => {
      if (e.target.matches("button, .study-card, .option-btn")) {
        SoundManager.play("hover");
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.matches("button, .study-card, .option-btn")) {
        SoundManager.play("click");
      }
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", handleGlobalKeydown);
  }

  function handleGlobalKeydown(e) {
    const key = e.key;

    // 1. Video Playing -> Skip
    if (
      VideoManager.currentVideo &&
      !VideoManager.currentVideo.paused &&
      !VideoManager.currentVideo.classList.contains("hidden")
    ) {
      if (key === " " || key === "Enter") {
        VideoManager.skip();
        e.preventDefault();
        return;
      }
    }

    // 2. Intro Screen -> Enter to Start
    if (
      UI.introOverlay &&
      !UI.introOverlay.classList.contains("hidden") &&
      (key === "Enter" || key === " ")
    ) {
      playIntro();
      e.preventDefault();
      return;
    }

    // 3. Game Playing Shortcuts
    if (GameState.gameStatus === "PLAYING") {
      // Options 1-4
      if (["1", "2", "3", "4"].includes(key)) {
        const index = parseInt(key) - 1;
        const buttons = UI.optionsContainer.querySelectorAll(".option-btn");
        if (buttons[index] && !buttons[index].disabled) {
          buttons[index].click();
        }
      }

      // Space -> Next Question (if feedback is visible)
      if (
        (key === " " || key === "Enter") &&
        UI.feedback &&
        !UI.feedback.classList.contains("hidden")
      ) {
        if (UI.nextBtn) UI.nextBtn.click();
        e.preventDefault();
      }
    }

    // 4. Result Screen -> Restart
    if (
      GameState.gameStatus === "END" &&
      Screens.result.classList.contains("active")
    ) {
      if (key === "Enter" || key === " ") {
        restartGame();
        e.preventDefault();
      }
    }
  }

  function requestWakeLock() {
    if ("wakeLock" in navigator) {
      navigator.wakeLock.request("screen").catch((err) => {
        // console.warn("Wake Lock not supported or failed:", err.message);
      });
    }
  }

  function playIntro() {
    if (UI.introOverlay) UI.introOverlay.classList.add("hidden");

    // 인트로 비디오 재생 후 시작 화면으로 이동
    VideoManager.play("intro-video", () => {
      showScreen("start");
    });
  }

  function showScreen(screenName) {
    Object.values(Screens).forEach((screen) => {
      if (screen) screen.classList.remove("active");
    });
    if (Screens[screenName]) Screens[screenName].classList.add("active");
  }

  // --- Study Mode Logic ---
  function initStudyMode() {
    if (!UI.studyGrid) return;
    UI.studyGrid.innerHTML = "";

    if (typeof QUIZ_SOURCE === "undefined") {
      console.error(
        "QUIZ_SOURCE is not defined. Make sure quiz_data.js is loaded.",
      );
      return;
    }

    Object.keys(QUIZ_SOURCE).forEach((category) => {
      const card = document.createElement("div");
      card.className = "study-card card-3d";
      card.innerHTML = `
            <div class="study-card-icon">📚</div>
            <h3 class="study-card-title">${category}</h3>
            <p class="study-card-desc">클릭하여 학습하기</p>
          `;
      card.addEventListener("click", () => openStudyModal(category));
      UI.studyGrid.appendChild(card);
    });
  }

  function openStudyModal(category) {
    if (!UI.studyModal || !QUIZ_SOURCE[category]) return;

    UI.studyTitle.textContent = category;
    UI.studyBody.innerHTML = QUIZ_SOURCE[category].summary;

    // 애니메이션 효과와 함께 보이기
    UI.studyModal.classList.remove("hidden");
  }

  function closeStudyModal() {
    if (UI.studyModal) UI.studyModal.classList.add("hidden");
  }

  // --- Quiz Generation Logic ---
  function generateQuizData() {
    if (typeof QUIZ_SOURCE === "undefined") return [];

    let allQuestions = [];

    // 모든 카테고리에서 문제 수집
    Object.keys(QUIZ_SOURCE).forEach((category) => {
      const questions = QUIZ_SOURCE[category].questions.map((q) => ({
        ...q,
        category: category,
      }));
      allQuestions = allQuestions.concat(questions);
    });

    // 전체 문제 셔플
    shuffleArray(allQuestions);

    // 10문제 선택 (문제가 부족하면 전체 선택)
    const selectedQuestions = allQuestions.slice(0, 10);

    // 각 문제에 대해 보기 셔플 및 정답 인덱스 업데이트
    return selectedQuestions.map((q, index) => {
      // 보기와 원래 인덱스를 묶어서 객체 배열 생성
      const choicesWithIndex = q.choices.map((text, originalIdx) => ({
        text,
        originalIdx,
      }));

      // 보기 셔플
      shuffleArray(choicesWithIndex);

      // 셔플된 보기 텍스트 배열
      const newChoices = choicesWithIndex.map((c) => c.text);

      // 정답 인덱스 찾기 (원래 정답 인덱스와 일치하는 항목의 새 인덱스)
      const newAnswer = choicesWithIndex.findIndex(
        (c) => c.originalIdx === q.answer,
      );

      return {
        id: index + 1,
        category: q.category,
        question: q.question,
        choices: newChoices,
        answer: newAnswer,
        explanation: q.explanation,
        difficulty: "Normal", // 난이도는 일단 Normal로 통일
      };
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function handleStartButton() {
    const hideGuide = localStorage.getItem("vibe_hide_guide");
    if (hideGuide === "true") {
      startGame();
    } else {
      showGuideModal();
    }
  }

  let guideTimerId = null;

  function showGuideModal() {
    if (!UI.guideModal) {
      startGame();
      return;
    }

    UI.guideModal.classList.remove("hidden");

    // Log popup exposure
    // console.log("[LOG] Guide Popup Shown at " + new Date().toISOString());

    // Auto timer removed as per user request
    if (UI.guideTimerProgress) {
      UI.guideTimerProgress.style.display = "none";
    }
  }

  function startGame() {
    // Clear Guide Timer if manual start
    if (guideTimerId) clearTimeout(guideTimerId);

    // Handle "Don't show again"
    if (UI.guideModal && !UI.guideModal.classList.contains("hidden")) {
      if (UI.dontShowGuide && UI.dontShowGuide.checked) {
        localStorage.setItem("vibe_hide_guide", "true");
      }
      UI.guideModal.classList.add("hidden");
    }

    // 퀴즈 데이터 생성
    QUIZ_DATA = generateQuizData();

    if (QUIZ_DATA.length === 0) {
      alert("퀴즈 데이터를 불러올 수 없습니다.");
      return;
    }

    GameState.hp = GameState.maxHp;
    GameState.score = 0;
    GameState.combo = 0;
    GameState.currentQuizIndex = 0;
    GameState.gameStatus = "PLAYING";
    GameState.skillUsed = false;
    GameState.isBossMode = false;

    // Reset Skill UI
    if (UI.skillBtn) {
      UI.skillBtn.disabled = false;
      UI.skillBtn.classList.remove("used");
      if (UI.skillStatus) UI.skillStatus.textContent = "READY";
    }

    // 퀴즈 순서 (이미 generateQuizData에서 셔플하고 잘랐으므로 순서대로 0~9)
    GameState.quizOrder = QUIZ_DATA.map((q) => q.id);

    updateHUD();
    SoundManager.play("bgm");
    showScreen("quiz");

    loadNextQuiz();
  }

  function loadNextQuiz() {
    // 피드백 숨김
    if (UI.feedback) UI.feedback.classList.add("hidden");

    if (GameState.currentQuizIndex >= GameState.quizOrder.length) {
      endGame(true);
      return;
    }

    const quizId = GameState.quizOrder[GameState.currentQuizIndex];
    const quiz = QUIZ_DATA.find((q) => q.id === quizId);

    if (!quiz) return;

    // Boss Mode Check (10번 문제)
    if (GameState.currentQuizIndex === 9 || quiz.difficulty === "Boss") {
      document.body.classList.add("boss-mode");
      GameState.isBossMode = true;
      
      if (SoundManager.bgmOscillators.length > 0) {
          const ctx = SoundManager.audioContext;
          SoundManager.bgmOscillators.forEach(osc => {
              if (osc.frequency.value < 150) { // Base A2 is 110
                 osc.frequency.linearRampToValueAtTime(osc.frequency.value * 1.5, ctx.currentTime + 2);
              }
          });
      }
    } else {
      document.body.classList.remove("boss-mode");
      GameState.isBossMode = false;
    }

    // 문제 표시
    UI.questionNum.textContent = `문제 ${GameState.currentQuizIndex + 1}/${QUIZ_DATA.length}`;
    UI.questionText.textContent = quiz.question;

    // 코드 블록 처리
    const existingCode = UI.questionText.querySelector(".code-block");
    if (existingCode) existingCode.remove();
    const existingBr = UI.questionText.querySelector("br");
    if (existingBr) existingBr.remove();

    if (quiz.code) {
      const codeEl = document.createElement("pre");
      codeEl.className = "code-block";
      codeEl.textContent = quiz.code;
      UI.questionText.appendChild(document.createElement("br"));
      UI.questionText.appendChild(codeEl);
    }

    // 보기 생성
    renderChoices(quiz);

    // 타이머 시작
    startTimer();
  }

  function renderChoices(quiz) {
    UI.optionsContainer.innerHTML = "";

    quiz.choices.forEach((choiceText, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.dataset.index = index;

      btn.innerHTML = `
        <span class="option-index">${index + 1}</span>
        <span class="option-text">${choiceText}</span>
      `;

      btn.addEventListener("click", () => checkAnswer(index, quiz));
      UI.optionsContainer.appendChild(btn);
    });
  }

  function useSkill() {
    if (GameState.skillUsed || GameState.gameStatus !== "PLAYING") return;

    const currentQuizId = GameState.quizOrder[GameState.currentQuizIndex];
    const quiz = QUIZ_DATA.find((q) => q.id === currentQuizId);

    if (!quiz) return;

    // 정답이 아닌 보기들 찾기
    const wrongIndices = [];
    quiz.choices.forEach((_, index) => {
      if (index !== quiz.answer) wrongIndices.push(index);
    });

    // 2개 랜덤 선택
    const removedIndices = [];
    while (removedIndices.length < 2 && wrongIndices.length > 0) {
      const randIdx = Math.floor(Math.random() * wrongIndices.length);
      removedIndices.push(wrongIndices[randIdx]);
      wrongIndices.splice(randIdx, 1);
    }

    // UI 업데이트 (버튼 비활성화)
    const buttons = UI.optionsContainer.querySelectorAll(".option-btn");
    removedIndices.forEach((idx) => {
      if (buttons[idx]) {
        buttons[idx].disabled = true;
        buttons[idx].style.opacity = "0.3";
        buttons[idx].style.textDecoration = "line-through";
      }
    });

    // 스킬 사용 처리
    GameState.skillUsed = true;
    if (UI.skillBtn) {
      UI.skillBtn.disabled = true;
      UI.skillBtn.classList.add("used");
      if (UI.skillStatus) UI.skillStatus.textContent = "USED";
    }

    SoundManager.play("levelup"); // 스킬 사용 효과음
  }

  function startTimer() {
    if (GameState.timer) clearInterval(GameState.timer);

    GameState.timeLeft = GameState.maxTime;
    GameState.lastTimerSound = Math.ceil(GameState.timeLeft); // Initialize sound tracker
    updateTimerUI();

    GameState.timer = setInterval(() => {
      // 게임 중이 아니면 타이머 중단
      if (GameState.gameStatus !== "PLAYING") {
        clearInterval(GameState.timer);
        return;
      }

      GameState.timeLeft -= 0.1;
      updateTimerUI();

      // 5초 이하일 때 초 단위로 경고음 재생
      const currentCeil = Math.ceil(GameState.timeLeft);
      if (
        GameState.timeLeft <= 5 &&
        GameState.timeLeft > 0 &&
        currentCeil < GameState.lastTimerSound
      ) {
        SoundManager.play("timer");
        GameState.lastTimerSound = currentCeil;
      }

      if (GameState.timeLeft <= 0) {
        clearInterval(GameState.timer);
        SoundManager.play("timeout"); // Time out sound
        handleTimeOut();
      }
    }, 100);
  }

  function updateTimerUI() {
    const percentage = (GameState.timeLeft / GameState.maxTime) * 100;
    if (UI.timerBar) UI.timerBar.style.width = `${percentage}%`;
    if (UI.timerText) UI.timerText.textContent = Math.ceil(GameState.timeLeft);

    // 긴박감 연출 (5초 미만)
    if (GameState.timeLeft <= 5) {
      if (UI.timerBar) UI.timerBar.classList.add("warning");
      if (UI.timerText) {
        UI.timerText.style.color = "#ef4444";
        UI.timerText.style.animation = "timer-blink 0.5s infinite";
      }
    } else {
      if (UI.timerBar) UI.timerBar.classList.remove("warning");
      if (UI.timerText) {
        UI.timerText.style.color = "var(--primary-cyan)";
        UI.timerText.style.animation = "none";
      }
    }

    if (percentage < 30 && UI.timerBar) {
      UI.timerBar.style.backgroundColor = "#ef4444"; // Red
    } else if (UI.timerBar) {
      UI.timerBar.style.backgroundColor = "#00e5ff"; // Cyan
    }
  }

  function handleTimeOut() {
    SoundManager.play("wrong");
    GameState.combo = 0;
    GameState.hp--;
    
    // 시각 효과: 화면 흔들림 (Screen Shake)
    document.body.classList.remove("shake");
    void document.body.offsetWidth;
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);

    updateHUD();

    const currentQuizId = GameState.quizOrder[GameState.currentQuizIndex];
    const quiz = QUIZ_DATA.find((q) => q.id === currentQuizId);

    showFeedback(false, quiz);

    // Check Game Over
    checkGameOver();
  }

  function checkAnswer(selectedIndex, quiz) {
    if (GameState.gameStatus !== "PLAYING") return;

    clearInterval(GameState.timer);

    const isCorrect = selectedIndex === quiz.answer;

    // 버튼 스타일 업데이트
    const buttons = UI.optionsContainer.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = true)); // 중복 클릭 방지

    buttons[selectedIndex].classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect) {
      buttons[quiz.answer].classList.add("correct");
    }

    if (isCorrect) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }

    showFeedback(isCorrect, quiz);

    // 다음 문제로 넘어가는 것은 '다음 문제' 버튼 클릭 시 수행
    // 단, 게임오버 체크는 handleWrongAnswer에서 수행됨
    // 만약 게임오버라면 showFeedback 이후 다음 버튼 누르면 결과창으로 가거나
    // 여기서 즉시 종료 처리?
    // UX: 오답 -> 해설 보기 -> 다음 누르면 -> 실패 화면
    // 하지만 checkGameOver가 true를 반환하면 이미 endGame이 호출됨.
    // endGame 호출 시 피드백이 가려지거나 할 수 있음.
    // endGame에서 feedback을 hidden 처리함.
    // 그러므로 즉시 종료됨.

    if (!isCorrect && GameState.hp <= 0) {
      // 잠시 후 종료 (해설을 볼 시간을 줄지, 즉시 종료할지 결정)
      // 여기서는 즉시 종료 (기존 로직 따름)
      // checkGameOver() 호출은 handleWrongAnswer에서 함.
    } else {
      GameState.currentQuizIndex++;
    }
  }

  function handleCorrectAnswer() {
    SoundManager.play("correct");

    const baseScore = 100;
    const comboBonus = GameState.combo * 10;
    const timeBonus = Math.floor(GameState.timeLeft * 5);

    GameState.score += baseScore + comboBonus + timeBonus;
    GameState.combo++;

    // 콤보 팝업 애니메이션
    if (GameState.combo > 1) {
      const comboText = document.createElement("div");
      comboText.className = "combo-popup";
      comboText.textContent = `${GameState.combo} COMBO!`;
      document.body.appendChild(comboText);
      setTimeout(() => comboText.remove(), 1000);
    }

    // Confetti Effect (canvas-confetti)
    if (typeof confetti === "function") {
      const rect = UI.optionsContainer.querySelector(".correct").getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        colors: ["#00e5ff", "#ff00de", "#ff1493"],
        disableForReducedMotion: true
      });
    }

    // 시각 효과: 파티클 효과 (Robot Interaction)
    const robot = document.getElementById("css-robot");
    if (robot) {
      // 기존 애니메이션 제거 후 다시 적용
      robot.classList.remove("robot-nod-anim", "robot-shake-anim");
      void robot.offsetWidth; // Force Reflow
      robot.classList.add("robot-nod-anim"); // 고개 끄덕이기
    }

    // 시각 효과: 화면 플래시 (Green)
    const flash = document.createElement("div");
    flash.className = "damage-flash";
    flash.style.background = "rgba(16, 185, 129, 0.3)"; // Green
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);

    // 파티클 효과 (간단한 DOM 기반 파티클)
    createParticles(window.innerWidth / 2, window.innerHeight / 2, 20);

    updateHUD();
  }

  function handleWrongAnswer() {
    SoundManager.play("wrong");
    GameState.combo = 0;
    GameState.hp--;

    // 시각 효과: 화면 흔들림 (Screen Shake)
    document.body.classList.remove("shake");
    void document.body.offsetWidth; // Force Reflow
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);

    // 시각 효과: 화면 플래시 (Red)
    const flash = document.createElement("div");
    flash.className = "damage-flash";
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);

    // 시각 효과: 로봇 반응 (Head Shake)
    const robot = document.getElementById("css-robot");
    if (robot) {
      robot.classList.remove("robot-nod-anim", "robot-shake-anim");
      void robot.offsetWidth;
      robot.classList.add("robot-shake-anim");
    }

    updateHUD();
    checkGameOver();
  }

  // 간단한 파티클 시스템 추가
  function createParticles(x, y, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.width = Math.random() * 8 + 4 + "px";
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 },
        ],
        {
          duration: 800 + Math.random() * 400,
          easing: "cubic-bezier(0, .9, .57, 1)",
        },
      ).onfinish = () => particle.remove();

      document.body.appendChild(particle);
    }
  }

  function showFeedback(isCorrect, quiz) {
    if (!UI.feedback) return;

    UI.feedback.classList.remove("hidden");

    if (isCorrect) {
      UI.feedbackMessage.textContent = "정답입니다! 훌륭해요!";
      UI.feedbackMessage.style.color = "var(--success)";
      UI.feedbackIcon.textContent = "⭕";
      UI.feedbackIcon.style.borderColor = "var(--success)";
    } else {
      UI.feedbackMessage.textContent = "오답입니다. 힘내세요!";
      UI.feedbackMessage.style.color = "var(--error)";
      UI.feedbackIcon.textContent = "❌";
      UI.feedbackIcon.style.borderColor = "var(--error)";
    }

    UI.explanationText.textContent = quiz.explanation || "해설이 없습니다.";
  }

  function checkGameOver() {
    // 게임 중이 아닐 때(이미 종료되었거나 시작 전)는 체크하지 않음
    if (GameState.gameStatus !== "PLAYING") return false;

    if (GameState.hp <= 0) {
      // 즉시 종료
      setTimeout(() => endGame(false), 500);
      return true;
    }
    return false;
  }

  function updateHUD() {
    // HP Hearts
    if (UI.hpHearts) {
      const hearts = UI.hpHearts.querySelectorAll(".heart");
      hearts.forEach((heart, index) => {
        if (index < GameState.hp) {
          heart.classList.add("active");
          heart.style.opacity = "1";
        } else {
          heart.classList.remove("active");
          heart.style.opacity = "0.3";
        }
      });
    }

    // Score
    if (UI.score) UI.score.textContent = GameState.score;

    // Combo
    if (GameState.combo > 1) {
      if (UI.comboContainer) UI.comboContainer.classList.remove("hidden");
      if (UI.comboCount) UI.comboCount.textContent = GameState.combo;
    } else {
      if (UI.comboContainer) UI.comboContainer.classList.add("hidden");
    }
  }

  function endGame(isClear) {
    GameState.gameStatus = "END";
    clearInterval(GameState.timer);
    SoundManager.stop("bgm");
    document.body.classList.remove("boss-mode");

    if (UI.feedback) UI.feedback.classList.add("hidden");

    // 결과 비디오 재생
    const videoId = isClear ? "pass-video" : "fail-video";

    // 비디오 재생 후 결과 화면 표시
    VideoManager.play(videoId, () => {
      showResultScreen(isClear);
    });
  }

  function showResultScreen(isClear) {
    const rank = calculateRank(GameState.score);

    if (UI.finalScore) UI.finalScore.textContent = GameState.score;
    if (UI.rankDisplay) {
      UI.rankDisplay.textContent = rank.title;
      UI.rankDisplay.style.color = rank.color;
    }

    // 점수 원형 그래프 효과 (간단히 구현)
    const circle = document.getElementById("score-circle");
    if (circle) {
      // 최대 점수 대략 3000점 기준
      const percentage = Math.min(GameState.score / 3000, 1);
      const dashoffset = 628 * (1 - percentage); // 2 * pi * r (r=100)
      circle.style.strokeDasharray = 628;
      circle.style.strokeDashoffset = dashoffset;
    }

    if (UI.instructorText) {
      UI.instructorText.textContent = isClear
        ? "훌륭합니다! 모든 훈련을 성공적으로 마쳤습니다."
        : "훈련 실패! 다시 도전하여 더 강해지세요.";
    }

    showScreen("result");
    SoundManager.play(isClear ? "levelup" : "wrong");
  }

  function calculateRank(score) {
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (score >= RANKS[i].score) {
        return RANKS[i];
      }
    }
    return RANKS[0];
  }

  function restartGame() {
    // 인트로 비디오 재생 없이 바로 메인 화면으로 이동
    SoundManager.stop("bgm");
    if (GameState.timer) clearInterval(GameState.timer);

    showScreen("start");

    // 게임 가이드 팝업을 다시 띄우고 싶다면 아래 주석 해제 (단, '다시 보지 않기' 체크 안 했을 경우만)
    // const hideGuide = localStorage.getItem("vibe_hide_guide");
    // if (hideGuide !== "true") {
    //   showGuideModal();
    // }
  }

  function shareResult() {
    const rank = UI.rankDisplay ? UI.rankDisplay.textContent : "훈련병";
    const score = GameState.score;
    const text = `[바이브코딩 훈련소] 훈련 완료!\n계급: ${rank}\n점수: ${score}점\n나의 코딩 전투력을 확인해보세요! #바이브코딩 #코딩훈련소`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("결과가 클립보드에 복사되었습니다!");
        })
        .catch((err) => {
          alert("복사에 실패했습니다.");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  }

  // 초기화
  initGame();
});
