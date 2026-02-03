# 바이브코딩 훈련소 (Vibe Coding Training Center)

AI 교관과 함께하는 바이브코딩 역량 진단 퀴즈 프로젝트입니다.
Canva로 디자인된 3D AI 교관 테마를 웹으로 1:1 구현하였습니다.

## 🚀 배포 방법

이 프로젝트는 정적 웹사이트(HTML/CSS/JS)로 구성되어 있어 다양한 플랫폼에 쉽게 배포할 수 있습니다.

### 옵션 1: Netlify 배포 (추천)

1. [Netlify](https://www.netlify.com/)에 로그인합니다.
2. 'Add new site' > 'Deploy manually'를 선택합니다.
3. `vibecoding training` 폴더 전체를 드래그 앤 드롭합니다.
4. 즉시 배포가 완료됩니다.

### 옵션 2: GitHub Pages

1. GitHub 리포지토리를 생성합니다.
2. 코드를 푸시합니다:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. 리포지토리 설정(Settings) > Pages에서 'Deploy from a branch'를 선택하고 `main` 브랜치를 지정합니다.

### 옵션 3: Vercel

1. `npm install -g vercel`로 Vercel CLI를 설치합니다.
2. 터미널에서 `vercel` 명령어를 입력하고 안내를 따릅니다.

## 🛠 기술 스택

- HTML5, CSS3 (Variables, Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Canvas API (Particle Animation)
- CSS 3D Transforms

## 📂 프로젝트 구조

```
vibecoding training/
├── assets/             # 이미지 리소스 (로봇, 디자인 시안 등)
├── app.js              # 퀴즈 로직 및 애니메이션
├── index.html          # 메인 구조
├── style.css           # 스타일 및 반응형 디자인
├── quiz_data.json      # 퀴즈 데이터
└── README.md           # 프로젝트 문서
```
