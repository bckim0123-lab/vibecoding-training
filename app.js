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
    lastTimerSound: 0,
    // 캐릭터 정보
    playerName: localStorage.getItem("vibe_player_name") || "훈련병",
    playerColor: "cyan",
    wrongAnswers: [],
    pendingFail: false,
    lastRankTitle: "훈련병",
    correctCount: 0,
    answeredCount: 0,
    studiedCategories: new Set(),
    studyBonusSeconds: 0,
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

    hasPlayableSource(video) {
      if (!video) return false;
      if (video.error) return false;
      const source = video.querySelector("source");
      return !!(source && source.getAttribute("src"));
    },

    play(videoId, onEndCallback) {
      const video = document.getElementById(videoId);
      const overlay = document.getElementById("video-overlay");
      const skipBtn = document.getElementById("skip-btn");

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        this.stop();
        if (onEndCallback) onEndCallback();
      };

      if (!video || !overlay || !this.hasPlayableSource(video)) {
        finish();
        return;
      }

      this.stop();
      this.currentVideo = video;
      video.onended = finish;
      video.onerror = finish;

      let shown = false;
      const reveal = () => {
        if (finished || shown) return;
        shown = true;
        overlay.classList.remove("hidden");
        video.classList.remove("hidden");
        if (skipBtn) skipBtn.classList.remove("hidden");
      };

      // canplay 이후에만 오버레이 표시 → 없는 파일이면 검정 화면 없이 즉시 진행
      const onCanPlay = () => {
        if (finished) return;
        reveal();
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(finish);
      };

      video.addEventListener("canplay", onCanPlay, { once: true });
      try {
        video.load();
      } catch (e) {
        finish();
        return;
      }

      setTimeout(() => {
        if (!finished && !shown) finish();
      }, 500);
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
    character: document.getElementById("character-screen"),
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

    // Character Modal
    charModal: document.getElementById("character-screen"),
    charNameInput: document.getElementById("char-name-input"),
    charCreateBtn: document.getElementById("char-create-btn"),
    previewRobot: document.getElementById("preview-robot"),

    // Ranking Modal
    rankingModal: document.getElementById("ranking-modal"),
    rankingList: document.getElementById("ranking-list"),
    closeRankingBtn: document.getElementById("close-ranking-btn"),
    showRankingBtn: document.getElementById("show-ranking-btn"),
    rankTabs: document.querySelectorAll(".rank-tab"),
  };

  // ==========================================================================
  // 5. 게임 로직 (Game Logic)
  // ==========================================================================

  function initGame() {
    SoundManager.init();
    initParticles();

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
    // Start Button -> 이름 있으면 바로 훈련, 없으면 캐릭터 생성
    if (UI.startBtn) {
      UI.startBtn.addEventListener("click", onDeployClick);
      updateDeployButtonLabel();
    }
    if (UI.guideStartBtn) UI.guideStartBtn.addEventListener("click", startGame);

    if (UI.restartBtn) UI.restartBtn.addEventListener("click", restartGame);
    if (UI.shareBtn) UI.shareBtn.addEventListener("click", shareResult);
    if (UI.nextBtn) UI.nextBtn.addEventListener("click", handleNextButton);
    if (UI.skillBtn) UI.skillBtn.addEventListener("click", useSkill);

    // Character Creation Events
    if (UI.charCreateBtn)
      UI.charCreateBtn.addEventListener("click", completeCharacterCreation);

    // Ranking Events
    if (UI.showRankingBtn)
      UI.showRankingBtn.addEventListener("click", showRankingBoard);
    if (UI.closeRankingBtn)
      UI.closeRankingBtn.addEventListener("click", () =>
        UI.rankingModal.classList.add("hidden"),
      );
    if (UI.rankTabs) {
      UI.rankTabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
          const filter = e.target.dataset.filter;
          updateRankingTab(filter);
        });
      });
    }

    // Study Modal Event Listeners
    if (UI.closeStudyBtn) {
      UI.closeStudyBtn.addEventListener("click", closeStudyModal);
    }
    window.addEventListener("click", (e) => {
      if (e.target === UI.studyModal) {
        closeStudyModal();
      }
      if (e.target === UI.rankingModal) {
        UI.rankingModal.classList.add("hidden");
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

    // Esc: 모달 닫기
    if (key === "Escape") {
      if (UI.studyModal && !UI.studyModal.classList.contains("hidden")) {
        closeStudyModal();
        e.preventDefault();
        return;
      }
      if (UI.rankingModal && !UI.rankingModal.classList.contains("hidden")) {
        UI.rankingModal.classList.add("hidden");
        e.preventDefault();
        return;
      }
      if (UI.guideModal && !UI.guideModal.classList.contains("hidden")) {
        // 가이드는 실수로 닫지 않음
      }
    }

    // 1. Video overlay visible -> Skip
    const videoOverlay = document.getElementById("video-overlay");
    if (
      videoOverlay &&
      !videoOverlay.classList.contains("hidden") &&
      (key === " " || key === "Enter" || key === "Escape")
    ) {
      VideoManager.skip();
      e.preventDefault();
      return;
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
      if (["1", "2", "3", "4"].includes(key)) {
        const index = parseInt(key) - 1;
        const buttons = UI.optionsContainer.querySelectorAll(".option-btn");
        if (buttons[index] && !buttons[index].disabled) {
          buttons[index].click();
        }
      }

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
      Screens.result &&
      Screens.result.classList.contains("active")
    ) {
      if (key === "Enter" || key === " ") {
        restartGame();
        e.preventDefault();
      }
    }
  }

  function updateDeployButtonLabel() {
    if (!UI.startBtn) return;
    const label = UI.startBtn.querySelector(".button-text");
    if (!label) return;
    const saved = (localStorage.getItem("vibe_player_name") || "").trim();
    label.textContent = saved
      ? `${saved}, 바로 훈련 시작!`
      : "전투 배치 (Deploy)";
  }

  function onDeployClick() {
    const saved = (localStorage.getItem("vibe_player_name") || "").trim();
    if (saved) {
      GameState.playerName = saved;
      handleStartButton();
      return;
    }
    showCharacterCreation();
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
  const STUDY_META = {
    "기초 이론": { icon: "📝", desc: "디렉팅, Vibe Loop, 검증 책임" },
    "개발 기초": { icon: "🎨", desc: "프론트엔드, 백엔드, API, DB" },
    "핵심 용어": { icon: "🤖", desc: "LLM, 프롬프트, 컨텍스트, 할루시네이션" },
    "실전 도구": { icon: "🛠️", desc: "Cursor Agent, Claude Code, Rules, MCP" },
    "심화 개념": { icon: "🚀", desc: "Git, MCP, RAG, 검증 습관" },
    프로세스: { icon: "🔄", desc: "지시 → 생성 → 검증 → 반복" },
  };

  function getStudiedSet() {
    try {
      return new Set(JSON.parse(localStorage.getItem("vibe_studied_cats") || "[]"));
    } catch (e) {
      return new Set();
    }
  }

  function markStudied(category) {
    const set = getStudiedSet();
    set.add(category);
    try {
      localStorage.setItem("vibe_studied_cats", JSON.stringify([...set]));
    } catch (e) {
      /* ignore */
    }
    initStudyMode();
  }

  function initStudyMode() {
    if (!UI.studyGrid) return;
    UI.studyGrid.innerHTML = "";

    if (typeof QUIZ_SOURCE === "undefined") {
      console.error(
        "QUIZ_SOURCE is not defined. Make sure quiz_data.js is loaded.",
      );
      return;
    }

    const studied = getStudiedSet();
    const cats = Object.keys(QUIZ_SOURCE);
    const doneCount = cats.filter((c) => studied.has(c)).length;

    const progress = document.createElement("div");
    progress.className = "study-progress-banner";
    const bonusSec = Math.min(doneCount, 6) * 2;
    progress.innerHTML = `
      <span>📚 학습 진행 ${doneCount}/${cats.length}</span>
      <span class="study-progress-hint">${
        doneCount === cats.length
          ? `전 과목 완료! 타이머 +${bonusSec}초 · HP+1 · 학습 힌트`
          : doneCount > 0
            ? `보너스: 타이머 +${bonusSec}초 · 학습 과목 보기 힌트`
            : "과목 학습 → 타이머 연장 + 보기 힌트"
      }</span>
    `;
    UI.studyGrid.appendChild(progress);

    cats.forEach((category) => {
      const meta = STUDY_META[category] || {
        icon: "📚",
        desc: "클릭하여 학습하기",
      };
      const done = studied.has(category);
      const card = document.createElement("div");
      card.className = `study-card card-3d${done ? " studied" : ""}`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${category} 학습하기`);
      card.innerHTML = `
            <div class="study-card-icon">${meta.icon}</div>
            <h3 class="study-card-title">${category}</h3>
            <p class="study-card-desc">${meta.desc}</p>
            <span class="study-card-badge">${done ? "✅ 학습 완료" : "읽기 · 미니퀴즈"}</span>
          `;
      const open = () => openStudyModal(category);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
      UI.studyGrid.appendChild(card);
    });
  }

  // --- Background Particles ---
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    const count = 55;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        a: Math.random() * 0.5 + 0.2,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.a})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  function openStudyModal(category) {
    if (!UI.studyModal || !QUIZ_SOURCE[category]) return;

    UI.studyTitle.textContent = category;
    const data = QUIZ_SOURCE[category];
    const pool = data.questions || [];
    const sample = pool[Math.floor(Math.random() * pool.length)] || pool[0];
    if (!sample) return;

    // 본문 + 미니퀴즈(학습 확인)
    UI.studyBody.innerHTML = `
      ${data.summary}
      <div class="mini-quiz" id="mini-quiz">
        <h3>⚡ 30초 미니퀴즈 — 이해했는지 확인!</h3>
        <p class="mini-quiz-q">${sample.question}</p>
        <div class="mini-quiz-choices" id="mini-quiz-choices"></div>
        <p class="mini-quiz-feedback hidden" id="mini-quiz-feedback"></p>
        <button type="button" class="mini-quiz-complete hidden" id="mini-quiz-complete">
          학습 완료하고 닫기 ✅
        </button>
      </div>
    `;

    const choicesEl = document.getElementById("mini-quiz-choices");
    const feedbackEl = document.getElementById("mini-quiz-feedback");
    const completeBtn = document.getElementById("mini-quiz-complete");

    sample.choices.forEach((text, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mini-quiz-btn";
      btn.textContent = text;
      btn.addEventListener("click", () => {
        const correct = index === sample.answer;
        choicesEl.querySelectorAll("button").forEach((b) => (b.disabled = true));
        btn.classList.add(correct ? "correct" : "wrong");
        if (!correct) {
          const right = choicesEl.children[sample.answer];
          if (right) right.classList.add("correct");
        }
        feedbackEl.classList.remove("hidden");
        feedbackEl.textContent = correct
          ? `정답! ${sample.explanation}`
          : `아쉬워요. ${sample.explanation}`;
        feedbackEl.style.color = correct ? "var(--success)" : "var(--error)";
        completeBtn.classList.remove("hidden");
        if (correct) SoundManager.play("correct");
        else SoundManager.play("wrong");
      });
      choicesEl.appendChild(btn);
    });

    completeBtn.addEventListener("click", () => {
      markStudied(category);
      closeStudyModal();
    });

    UI.studyModal.classList.remove("hidden");
  }

  function closeStudyModal() {
    if (UI.studyModal) UI.studyModal.classList.add("hidden");
  }

  // --- Character Creation Logic ---
  window.showCharacterCreation = function () {
    const screen = document.getElementById("character-screen");
    if (!screen) return;
    showScreen("character");
    updateRobotPreview(0);
    const nameInput = document.getElementById("char-name-input");
    if (nameInput) {
      // 저장된 코드네임 자동 채움 (재도전 마찰 축소)
      nameInput.value = localStorage.getItem("vibe_player_name") || "";
      nameInput.focus();
    }
  };

  // 내부 함수 유지를 위해 (기존 참조 호환성)
  function showCharacterCreation() {
    window.showCharacterCreation();
  }

  // 색상 선택 함수 제거됨 -> 점수 기반 스타일 업데이트 함수로 대체
  function updateRobotPreview(score) {
    const img = document.getElementById("preview-character-img");
    if (!img) return;

    if (score >= 2000) {
      img.src = "assets/char_master.png";
      img.classList.add("rank-master");
    } else if (score >= 1000) {
      img.src = "assets/char_elite.png";
      img.classList.remove("rank-master");
    } else if (score >= 300) {
      img.src = "assets/char_soldier.png";
      img.classList.remove("rank-master");
    } else {
      img.src = "assets/char_recruit.png";
      img.classList.remove("rank-master");
    }
  }

  function completeCharacterCreation() {
    const name = UI.charNameInput.value.trim();
    if (name.length < 1) {
      alert("이름을 입력해주세요.");
      return;
    }

    GameState.playerName = name;
    try {
      localStorage.setItem("vibe_player_name", name);
    } catch (e) {
      /* ignore */
    }
    updateDeployButtonLabel();
    showScreen("start");
    applyCharacterStyle(0);
    handleStartButton();
  }

  function applyCharacterStyle(score) {
    const ingameImg = document.getElementById("ingame-character-img");
    const resultImg = document.getElementById("result-character-img");

    const updateImage = (img) => {
      if (!img) return;

      if (score >= 2000) {
        img.src = "assets/char_master.png";
      } else if (score >= 1000) {
        img.src = "assets/char_elite.png";
      } else if (score >= 300) {
        img.src = "assets/char_soldier.png";
      } else {
        img.src = "assets/char_recruit.png";
      }
    };

    updateImage(ingameImg);
    updateImage(resultImg);
  }

  // --- Ranking Logic (시드 고정 + localStorage 영구 저장) ---
  // 현실적인 점수대 (대략 만점 ~2100 전후) — 유저가 상위권에 오를 수 있게
  const SEED_RANKINGS = [
    { name: "바이브교관", score: 1680, date: "2026-08-01T10:00:00.000Z", seed: true },
    { name: "디렉터김", score: 1520, date: "2026-08-02T12:00:00.000Z", seed: true },
    { name: "Cursor마스터", score: 1410, date: "2026-08-03T09:30:00.000Z", seed: true },
    { name: "프롬프트왕", score: 1280, date: "2026-08-04T14:00:00.000Z", seed: true },
    { name: "검증병장", score: 1150, date: "2026-08-05T16:45:00.000Z", seed: true },
    { name: "루프훈련병", score: 980, date: "2026-08-06T11:20:00.000Z", seed: true },
    { name: "MCP탐험가", score: 860, date: "2026-08-07T08:10:00.000Z", seed: true },
    { name: "Git세이브", score: 720, date: "2026-08-08T19:00:00.000Z", seed: true },
  ];

  const RankingManager = {
    storageKey: "vibecoding_ranking_v3",
    maxStored: 50,

    ensureSeeded(list) {
      const hasSeed = list.some((r) => r.seed === true);
      if (list.length === 0 || !hasSeed) {
        return this.mergeAndSort([...SEED_RANKINGS, ...list]);
      }
      return this.mergeAndSort(list);
    },

    mergeAndSort(list) {
      // 같은 이름은 최고점만 유지 (시드는 이름 충돌 시 더 높은 점수 우선)
      const bestByName = new Map();
      list.forEach((entry) => {
        const key = (entry.name || "훈련병").trim();
        const prev = bestByName.get(key);
        if (!prev || entry.score > prev.score) {
          bestByName.set(key, { ...entry, name: key });
        }
      });
      return Array.from(bestByName.values()).sort((a, b) => b.score - a.score);
    },

    persist(rankings) {
      const trimmed = rankings.slice(0, this.maxStored);
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(trimmed));
      } catch (e) {
        console.warn("랭킹 저장 실패:", e);
      }
      return trimmed;
    },

    saveScore(name, score) {
      const newEntry = {
        name: (name || "훈련병").trim(),
        score: score,
        date: new Date().toISOString(),
        seed: false,
      };

      let rankings = this.getRankings();
      rankings.push(newEntry);
      rankings = this.mergeAndSort(rankings);
      this.persist(rankings);
    },

    getRankings() {
      let parsed = [];
      try {
        const data = localStorage.getItem(this.storageKey);
        parsed = data ? JSON.parse(data) : [];
        if (!Array.isArray(parsed)) parsed = [];
      } catch (e) {
        parsed = [];
      }

      // 구버전 키 마이그레이션
      if (parsed.length === 0) {
        try {
          const legacy = localStorage.getItem("vibecoding_ranking_v1");
          if (legacy) {
            const legacyParsed = JSON.parse(legacy);
            if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
              parsed = legacyParsed;
            }
          }
        } catch (e) {
          /* ignore */
        }
      }

      const withSeed = this.ensureSeeded(parsed);
      // 비어 있었거나 시드가 빠져 있으면 즉시 고정 저장
      this.persist(withSeed);
      return withSeed;
    },

    getFilteredRankings(filter) {
      let all = this.getRankings();
      const now = new Date();

      if (filter === "monthly") {
        return all.filter((r) => {
          if (r.seed) return false; // 월간은 실제 기록만
          const d = new Date(r.date);
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        });
      } else if (filter === "weekly") {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return all.filter((r) => {
          if (r.seed) return false; // 주간은 실제 기록만
          return new Date(r.date) >= oneWeekAgo;
        });
      }

      return all;
    },
  };

  function showRankingBoard() {
    UI.rankingModal.classList.remove("hidden");
    updateRankingTab("all");
  }

  function updateRankingTab(filter) {
    // 탭 UI 업데이트
    UI.rankTabs.forEach((tab) => {
      if (tab.dataset.filter === filter) tab.classList.add("active");
      else tab.classList.remove("active");
    });

    const data = RankingManager.getFilteredRankings(filter);
    renderRankingList(data);
  }

  function renderRankingList(data) {
    UI.rankingList.innerHTML = "";

    if (data.length === 0) {
      UI.rankingList.innerHTML = `<div class="empty-rank">NO RECORD</div>`;
      return;
    }

    data.slice(0, 10).forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "rank-item arcade-item";

      const dateStr = new Date(item.date).toLocaleDateString();

      let rankIcon = index + 1;
      if (index === 0) rankIcon = "1ST 👑";
      if (index === 1) rankIcon = "2ND";
      if (index === 2) rankIcon = "3RD";

      const nameLabel = item.seed
        ? `${item.name} <span class="seed-badge">NPC</span>`
        : item.name;

      div.innerHTML = `
            <span class="rank-col-rank">${rankIcon}</span>
            <span class="rank-col-name">${nameLabel}</span>
            <span class="rank-col-score">${item.score.toLocaleString()}</span>
            <span class="rank-col-date">${dateStr}</span>
          `;

      UI.rankingList.appendChild(div);
    });
  }

  // --- Quiz Generation Logic ---
  function generateQuizData() {
    if (typeof QUIZ_SOURCE === "undefined") return [];

    const categories = Object.keys(QUIZ_SOURCE);
    const selectedQuestions = [];
    const used = new Set();

    // 카테고리별 1문항씩 우선 배정 (균형 출제)
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

    // 나머지 랜덤 보충 (카테고리당 최대 2문항으로 편중 완화)
    const catCount = {};
    selectedQuestions.forEach((q) => {
      catCount[q.category] = (catCount[q.category] || 0) + 1;
    });

    let allQuestions = [];
    categories.forEach((category) => {
      QUIZ_SOURCE[category].questions.forEach((q, i) => {
        const key = `${category}-${i}`;
        if (!used.has(key)) {
          allQuestions.push({ ...q, category, _key: key });
        }
      });
    });
    shuffleArray(allQuestions);

    const take = (maxPerCat) => {
      for (let i = 0; i < allQuestions.length && selectedQuestions.length < 10; ) {
        const q = allQuestions[i];
        const n = catCount[q.category] || 0;
        if (n >= maxPerCat) {
          i++;
          continue;
        }
        selectedQuestions.push(q);
        used.add(q._key);
        catCount[q.category] = n + 1;
        allQuestions.splice(i, 1);
      }
    };
    take(2);
    // 그래도 부족하면 제한 해제하고 채움
    while (selectedQuestions.length < 10 && allQuestions.length > 0) {
      selectedQuestions.push(allQuestions.shift());
    }

    shuffleArray(selectedQuestions);

    // 각 문제에 대해 보기 셔플 및 정답 인덱스 업데이트
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
        explanation: q.explanation,
        difficulty: "Normal",
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

    // 학습 보너스: 완료 과목당 +2초(최대 +12), 전 과목이면 HP+1
    const studied = getStudiedSet();
    const studiedCount = studied.size;
    GameState.studiedCategories = studied;
    GameState.studyBonusSeconds = Math.min(studiedCount, 6) * 2;
    GameState.maxTime = 15 + GameState.studyBonusSeconds;
    GameState.maxHp = studiedCount >= 6 ? 4 : 3;

    GameState.hp = GameState.maxHp;
    GameState.score = 0;
    GameState.combo = 0;
    GameState.maxCombo = 0;
    GameState.currentQuizIndex = 0;
    GameState.gameStatus = "PLAYING";
    GameState.skillUsed = false;
    GameState.isBossMode = false;
    GameState.wrongAnswers = [];
    GameState.pendingFail = false;
    GameState.lastRankTitle = "훈련병";
    GameState.correctCount = 0;
    GameState.answeredCount = 0;
    if (UI.nextBtn) {
      UI.nextBtn.innerHTML =
        "<span>다음 문제</span><span class=\"arrow\">→</span>";
    }

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

    if (GameState.studyBonusSeconds > 0 || GameState.maxHp > 3) {
      const toast = document.createElement("div");
      toast.className = "rankup-toast";
      const bits = [];
      if (GameState.studyBonusSeconds > 0) {
        bits.push(`타이머 +${GameState.studyBonusSeconds}초`);
      }
      if (GameState.maxHp > 3) bits.push("HP +1");
      bits.push("학습 과목 힌트");
      toast.textContent = `📚 학습 보너스: ${bits.join(" · ")}`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2200);
    }

    loadNextQuiz();
  }

  function loadNextQuiz() {
    // 피드백 숨김
    if (UI.feedback) UI.feedback.classList.add("hidden");

    if (GameState.currentQuizIndex >= GameState.quizOrder.length) {
      // 10문제 완료: 정답률 80% 이상이면 합격
      const accuracy =
        (GameState.correctCount / Math.max(QUIZ_DATA.length, 1)) * 100;
      endGame(accuracy >= 80);
      return;
    }

    const quizId = GameState.quizOrder[GameState.currentQuizIndex];
    const quiz = QUIZ_DATA.find((q) => q.id === quizId);

    if (!quiz) return;

    // Boss Mode Check (10번 문제)
    if (
      GameState.currentQuizIndex === QUIZ_DATA.length - 1 ||
      quiz.difficulty === "Boss"
    ) {
      document.body.classList.add("boss-mode");
      GameState.isBossMode = true;

      if (SoundManager.bgmOscillators.length > 0) {
        const ctx = SoundManager.audioContext;
        SoundManager.bgmOscillators.forEach((osc) => {
          if (osc.frequency.value < 150) {
            // Base A2 is 110
            osc.frequency.linearRampToValueAtTime(
              osc.frequency.value * 1.5,
              ctx.currentTime + 2,
            );
          }
        });
      }
    } else {
      document.body.classList.remove("boss-mode");
      GameState.isBossMode = false;
    }

    // 문제 표시
    UI.questionNum.textContent = `문제 ${GameState.currentQuizIndex + 1}/${QUIZ_DATA.length}`;
    const categoryBadge = document.getElementById("question-category");
    if (categoryBadge) {
      categoryBadge.textContent = quiz.category || "훈련";
      categoryBadge.classList.remove("hidden");
    }
    const progressFill = document.getElementById("quiz-progress-bar");
    if (progressFill) {
      const pct =
        ((GameState.currentQuizIndex + 1) / Math.max(QUIZ_DATA.length, 1)) *
        100;
      progressFill.style.width = `${pct}%`;
    }
    const accuracyHud = document.getElementById("accuracy-hud");
    if (accuracyHud) {
      const answered = GameState.answeredCount;
      const acc =
        answered > 0
          ? Math.round((GameState.correctCount / answered) * 100)
          : 100;
      accuracyHud.textContent = `정답률 ${acc}% (${GameState.correctCount}/${answered || 0}) · 합격 80%`;
    }
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

    // 학습한 카테고리 문제: 오답 보기 1개 자동 제거(소프트 힌트)
    let studyHintIndex = -1;
    if (
      quiz.category &&
      GameState.studiedCategories &&
      GameState.studiedCategories.has(quiz.category)
    ) {
      const wrongs = quiz.choices
        .map((_, i) => i)
        .filter((i) => i !== quiz.answer);
      if (wrongs.length > 0) {
        studyHintIndex = wrongs[Math.floor(Math.random() * wrongs.length)];
      }
    }

    quiz.choices.forEach((choiceText, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.dataset.index = index;

      btn.innerHTML = `
        <span class="option-index">${index + 1}</span>
        <span class="option-text">${choiceText}</span>
      `;

      if (index === studyHintIndex) {
        btn.disabled = true;
        btn.classList.add("eliminated", "study-hint");
        btn.title = "학습 보너스: 오답 제거";
      } else {
        btn.addEventListener("click", () => checkAnswer(index, quiz));
      }
      UI.optionsContainer.appendChild(btn);
    });
  }

  function useSkill() {
    if (GameState.skillUsed || GameState.gameStatus !== "PLAYING") return;

    const currentQuizId = GameState.quizOrder[GameState.currentQuizIndex];
    const quiz = QUIZ_DATA.find((q) => q.id === currentQuizId);

    if (!quiz) return;

    const buttons = UI.optionsContainer.querySelectorAll(".option-btn");

    // 아직 살아있는 오답만 제거 후보
    const wrongIndices = [];
    quiz.choices.forEach((_, index) => {
      if (index === quiz.answer) return;
      if (buttons[index] && buttons[index].disabled) return;
      wrongIndices.push(index);
    });

    const removedIndices = [];
    while (removedIndices.length < 2 && wrongIndices.length > 0) {
      const randIdx = Math.floor(Math.random() * wrongIndices.length);
      removedIndices.push(wrongIndices[randIdx]);
      wrongIndices.splice(randIdx, 1);
    }

    removedIndices.forEach((idx) => {
      if (buttons[idx]) {
        buttons[idx].disabled = true;
        buttons[idx].classList.add("eliminated");
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

  function recordWrongAnswer(quiz, reason) {
    if (!quiz) return;
    GameState.wrongAnswers.push({
      question: quiz.question,
      category: quiz.category || "",
      explanation: quiz.explanation || "",
      reason: reason || "wrong",
    });
  }

  function showScorePopup(baseScore, comboBonus, timeBonus) {
    const el = document.createElement("div");
    el.className = "score-popup";
    const parts = [`+${baseScore}`];
    if (comboBonus > 0) parts.push(`콤보 +${comboBonus}`);
    if (timeBonus > 0) parts.push(`시간 +${timeBonus}`);
    el.innerHTML = parts.map((p) => `<span>${p}</span>`).join("");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  function maybeCelebrateRankUp() {
    const rank = calculateRank(GameState.score);
    if (rank.title !== GameState.lastRankTitle) {
      GameState.lastRankTitle = rank.title;
      SoundManager.play("levelup");
      const toast = document.createElement("div");
      toast.className = "rankup-toast";
      toast.textContent = `진급! ${rank.title}`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1600);
      applyCharacterStyle(GameState.score);
      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: [rank.color, "#00e5ff", "#ffd700"],
        });
      }
    }
  }

  function handleTimeOut() {
    SoundManager.play("wrong");
    GameState.combo = 0;
    GameState.hp--;

    document.body.classList.remove("shake");
    void document.body.offsetWidth;
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 500);

    updateHUD();

    const currentQuizId = GameState.quizOrder[GameState.currentQuizIndex];
    const quiz = QUIZ_DATA.find((q) => q.id === currentQuizId);

    // 타임아웃 시에도 정답 표시 + 버튼 잠금
    if (UI.optionsContainer && quiz) {
      const buttons = UI.optionsContainer.querySelectorAll("button");
      buttons.forEach((btn) => (btn.disabled = true));
      if (buttons[quiz.answer]) buttons[quiz.answer].classList.add("correct");
    }

    GameState.answeredCount++;
    recordWrongAnswer(quiz, "timeout");
    showFeedback(false, quiz, "시간 초과! 해설을 확인하세요.");

    const isOver = checkGameOver();
    if (!isOver) {
      GameState.currentQuizIndex++;
    }
  }

  function checkAnswer(selectedIndex, quiz) {
    if (GameState.gameStatus !== "PLAYING") return;

    clearInterval(GameState.timer);

    const isCorrect = selectedIndex === quiz.answer;

    const buttons = UI.optionsContainer.querySelectorAll("button");
    buttons.forEach((btn) => (btn.disabled = true));

    buttons[selectedIndex].classList.add(isCorrect ? "correct" : "wrong");
    GameState.answeredCount++;
    if (!isCorrect) {
      buttons[quiz.answer].classList.add("correct");
      recordWrongAnswer(quiz, "wrong");
    }

    if (isCorrect) {
      GameState.correctCount++;
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }

    showFeedback(isCorrect, quiz);

    const isOver = !isCorrect && GameState.hp <= 0;
    if (!isOver) {
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
    if (GameState.combo > GameState.maxCombo) {
      GameState.maxCombo = GameState.combo;
    }

    showScorePopup(baseScore, comboBonus, timeBonus);
    applyCharacterStyle(GameState.score);
    maybeCelebrateRankUp();

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
      const rect = UI.optionsContainer
        .querySelector(".correct")
        .getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x, y },
        colors: ["#00e5ff", "#ff00de", "#ff1493"],
        disableForReducedMotion: true,
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

  function showFeedback(isCorrect, quiz, customMessage) {
    if (!UI.feedback) return;

    UI.feedback.classList.remove("hidden");

    if (isCorrect) {
      UI.feedbackMessage.textContent = customMessage || "정답입니다! 훌륭해요!";
      UI.feedbackMessage.style.color = "var(--success)";
      UI.feedbackIcon.textContent = "⭕";
      UI.feedbackIcon.style.borderColor = "var(--success)";
    } else {
      UI.feedbackMessage.textContent =
        customMessage || "오답입니다. 해설을 읽고 다음으로!";
      UI.feedbackMessage.style.color = "var(--error)";
      UI.feedbackIcon.textContent = "❌";
      UI.feedbackIcon.style.borderColor = "var(--error)";
    }

    const why = (quiz && quiz.explanation) || "해설이 없습니다.";
    UI.explanationText.innerHTML = `<strong class="explain-label">📘 왜 그럴까요?</strong> ${why}`;

    if (GameState.pendingFail && UI.nextBtn) {
      UI.nextBtn.innerHTML =
        "<span>결과 보기</span><span class=\"arrow\">→</span>";
    }
  }

  function checkGameOver() {
    if (GameState.gameStatus !== "PLAYING") return false;

    if (GameState.hp <= 0) {
      // 즉시 종료하지 않고 해설을 본 뒤 '결과 보기'로 이동
      GameState.pendingFail = true;
      if (UI.nextBtn) {
        UI.nextBtn.innerHTML =
          "<span>결과 보기</span><span class=\"arrow\">→</span>";
      }
      return true;
    }
    return false;
  }

  function handleNextButton() {
    if (GameState.pendingFail) {
      endGame(false);
      return;
    }
    loadNextQuiz();
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
    GameState.pendingFail = false;
    clearInterval(GameState.timer);
    SoundManager.stop("bgm");
    document.body.classList.remove("boss-mode");

    if (UI.feedback) UI.feedback.classList.add("hidden");

    // 점수 저장 (Local Ranking) — 0점도 기록해 재도전 동기 부여
    RankingManager.saveScore(GameState.playerName, GameState.score);

    // 결과 비디오 재생
    const videoId = isClear ? "pass-video" : "fail-video";

    // 비디오 재생 후 결과 화면 표시
    VideoManager.play(videoId, () => {
      showResultScreen(isClear);
    });
  }

  function showResultScreen(isClear) {
    const rank = calculateRank(GameState.score);
    const total = Math.max(QUIZ_DATA.length, 1);
    const answered = Math.max(GameState.answeredCount, 0);
    const earlyExit = answered > 0 && answered < total;
    // 중도 종료(HP 소진)는 푼 문제 기준, 완주는 10문제 기준
    const denom = earlyExit ? answered : total;
    const accuracy = Math.round(
      (GameState.correctCount / Math.max(denom, 1)) * 100,
    );
    const passAccuracy = Math.round(
      (GameState.correctCount / total) * 100,
    );

    if (UI.finalScore) UI.finalScore.textContent = GameState.score;
    if (UI.rankDisplay) {
      UI.rankDisplay.textContent = isClear
        ? `합격 · ${rank.title}`
        : `다시 도전하세요 · ${rank.title}`;
      UI.rankDisplay.style.color = isClear ? rank.color : "#ef4444";
    }

    const accuracyResult = document.getElementById("accuracy-result");
    if (accuracyResult) {
      accuracyResult.textContent = earlyExit
        ? `이번 판 정답률 ${accuracy}% (${GameState.correctCount}/${answered}) · HP 소진`
        : `정답률 ${passAccuracy}% (${GameState.correctCount}/${total}) · 합격 기준 80%`;
      accuracyResult.style.color =
        isClear || accuracy >= 80 ? "var(--success)" : "var(--error)";
    }

    const resultTitle = document.querySelector(".result-title");
    const resultBadge = document.querySelector(".result-badge");
    if (resultTitle) {
      resultTitle.textContent = isClear ? "합격!" : "다시 도전하세요!";
    }
    if (resultBadge) resultBadge.textContent = isClear ? "🎉" : "💪";

    const circle = document.getElementById("score-circle");
    if (circle) {
      const gauge = earlyExit ? accuracy : passAccuracy;
      const percentage = Math.min(gauge / 100, 1);
      const dashoffset = 628 * (1 - percentage);
      circle.style.strokeDasharray = 628;
      circle.style.strokeDashoffset = dashoffset;
    }

    if (UI.instructorText) {
      const comboMsg =
        GameState.maxCombo > 1 ? ` 최대 콤보 ${GameState.maxCombo}!` : "";
      if (isClear) {
        UI.instructorText.textContent = `${GameState.playerName} 훈련병, 합격입니다! 정답률 ${passAccuracy}%, 계급 ${rank.title}.${comboMsg}`;
      } else if (GameState.hp <= 0 && earlyExit) {
        UI.instructorText.textContent = `${GameState.playerName} 훈련병, HP 소진! 푼 문제 기준 정답률 ${accuracy}% (${GameState.correctCount}/${answered}). 복습 후 재도전하세요.`;
      } else {
        UI.instructorText.textContent = `${GameState.playerName} 훈련병, 정답률 ${passAccuracy}%로 합격선(80%) 미달! 오답을 복습하고 다시 도전하세요.`;
      }
    }

    // 오답 리뷰
    const reviewBox = document.getElementById("wrong-review");
    const reviewList = document.getElementById("wrong-review-list");
    if (reviewBox && reviewList) {
      reviewList.innerHTML = "";
      if (GameState.wrongAnswers.length === 0) {
        reviewBox.classList.add("hidden");
      } else {
        reviewBox.classList.remove("hidden");
        GameState.wrongAnswers.forEach((item, i) => {
          const div = document.createElement("div");
          div.className = "wrong-review-item";
          div.innerHTML = `
            <div class="wrong-review-q">${i + 1}. [${item.category}] ${item.question}</div>
            <div class="wrong-review-a">${item.explanation || "해설 없음"}</div>
          `;
          reviewList.appendChild(div);
        });
      }
    }

    // 재도전 버튼 문구
    if (UI.restartBtn) {
      const label = UI.restartBtn.querySelector("span:last-child");
      if (label) {
        label.textContent = isClear ? "더 높은 점수 도전!" : "바로 다시 도전!";
      }
    }

    showScreen("result");
    SoundManager.play(isClear ? "levelup" : "wrong");
    applyCharacterStyle(GameState.score);
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
    // 원탭 재도전: 이름 유지하고 바로 다음 판
    SoundManager.stop("bgm");
    if (GameState.timer) clearInterval(GameState.timer);
    document.body.classList.remove("boss-mode");

    if (UI.rankingModal) UI.rankingModal.classList.add("hidden");

    // 저장된 이름이 있으면 캐릭터 생성 스킵하고 즉시 시작
    const savedName = localStorage.getItem("vibe_player_name");
    if (savedName && savedName.trim().length > 0) {
      GameState.playerName = savedName.trim();
      handleStartButton();
      return;
    }

    showScreen("start");
  }

  function shareResult() {
    const rank = UI.rankDisplay ? UI.rankDisplay.textContent : "훈련병";
    const score = GameState.score;
    const total = Math.max(QUIZ_DATA.length, 1);
    const accuracy = Math.round((GameState.correctCount / total) * 100);
    const text = `[바이브코딩 훈련소] 결과\n${rank}\n점수: ${score}점\n정답률: ${accuracy}% (${GameState.correctCount}/${total})\n합격 기준 80% · #바이브코딩 #코딩훈련소`;

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

  // 랭킹 시드 고정 저장 (빈 보드 방지)
  RankingManager.getRankings();

  // 초기화
  initGame();
});
