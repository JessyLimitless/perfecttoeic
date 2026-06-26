// 모바일(390px)에서 토플 게임 + 결과 화면 캡처 (임시)
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
await wait(700);

// 토플 선택 → 시작 → 토플 게임(모바일)
await page.evaluate(() => {
  [...document.querySelectorAll("button")].find((b) => b.innerText.includes("토플"))?.click();
});
await wait(700);
await Promise.all([
  page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.textContent.includes("학습 시작"))?.click();
  }),
  page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 }).catch(() => {}),
]);
await wait(2200);
await page.screenshot({ path: ".shot_m_toefl_game.png", fullPage: true });
console.log("mobile toefl game captured");

// 6문제 풀고 그만하기 → 결과(모바일)
for (let i = 0; i < 6; i++) {
  await page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => /^[ABCD]/.test(b.innerText.trim()))?.click();
  });
  await wait(450);
  await page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.innerText.includes("다음"))?.click();
  });
  await wait(500);
}
await Promise.all([
  page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === "그만하기")?.click();
  }),
  page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 }).catch(() => {}),
]);
await wait(1200);
await page.screenshot({ path: ".shot_m_result.png", fullPage: true });
console.log("mobile result captured");

await browser.close();
