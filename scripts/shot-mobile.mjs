// 모바일 뷰포트(390px)로 앱 화면을 캡처하는 개발용 스크립트
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await page.goto(BASE, { waitUntil: "networkidle0" });
await wait(1200);
await page.screenshot({ path: ".shot_m_lobby.png" });
console.log("mobile lobby captured");

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
await page.screenshot({ path: ".shot_m_game.png", fullPage: true });
console.log("mobile game captured");

await page.evaluate(() => {
  const choice = [...document.querySelectorAll("button")].find((b) =>
    /^[ABCD]/.test(b.innerText.trim()),
  );
  choice?.click();
});
await wait(1400);
await page.screenshot({ path: ".shot_m_feedback.png", fullPage: true });
console.log("mobile feedback captured");

await browser.close();
