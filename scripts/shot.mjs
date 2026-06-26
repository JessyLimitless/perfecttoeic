// 실제 Chrome를 구동해 앱 화면을 캡처하는 개발용 스크립트
import puppeteer from "puppeteer-core";

const CHROME =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 860, height: 1000, deviceScaleFactor: 2 });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// 1) 로비
await page.goto(BASE, { waitUntil: "networkidle0" });
await wait(1200);
await page.screenshot({ path: ".shot_lobby.png" });
console.log("lobby captured");

// 2) 학습 시작 → 통독 화면
await Promise.all([
  page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      b.textContent.includes("학습 시작"),
    );
    btn?.click();
  }),
  page
    .waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 })
    .catch(() => {}),
]);
await wait(2500);
await page.screenshot({ path: ".shot_game.png", fullPage: true });
console.log("game captured");

// 3) 한 보기 선택 → 해설(피드백) 상태
await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")];
  // 보기 버튼(A~D)은 letter chip을 포함
  const choice = btns.find((b) => /^[ABCD]/.test(b.innerText.trim()));
  choice?.click();
});
await wait(1400);
await page.screenshot({ path: ".shot_feedback.png", fullPage: true });
console.log("feedback captured");

await browser.close();
