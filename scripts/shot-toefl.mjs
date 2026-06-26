// 토플 메뉴 선택 → 토플 게임 화면 캡처 (임시)
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 860, height: 1000, deviceScaleFactor: 2 });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await page.goto(BASE, { waitUntil: "networkidle0" });
await wait(800);

// 토플 토글 클릭
await page.evaluate(() => {
  [...document.querySelectorAll("button")]
    .find((b) => b.innerText.includes("토플"))
    ?.click();
});
await wait(900);
await page.screenshot({ path: ".shot_toefl_lobby.png" });
console.log("toefl lobby captured");

// 학습 시작
await Promise.all([
  page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => b.textContent.includes("학습 시작"))
      ?.click();
  }),
  page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 }).catch(() => {}),
]);
await wait(2500);
await page.screenshot({ path: ".shot_toefl_game.png", fullPage: true });
console.log("toefl game captured");

await browser.close();
