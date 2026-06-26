// 게임을 끝까지 자동 진행해 결과 화면을 캡처하는 임시 스크립트
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

// 학습 시작
await Promise.all([
  page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => b.textContent.includes("학습 시작"))
      ?.click();
  }),
  page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 }).catch(() => {}),
]);
await wait(1500);

// 무한 연습이므로 6문제만 풀고 종료. 일부러 첫 보기를 골라 오답 복습 카드도 생성.
for (let i = 0; i < 6; i++) {
  await page.evaluate(() => {
    const choice = [...document.querySelectorAll("button")].find((b) =>
      /^[ABCD]/.test(b.innerText.trim()),
    );
    choice?.click();
  });
  await wait(500);
  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => b.innerText.includes("다음"))
      ?.click();
  });
  await wait(600);
}

// 그만하기 → 결과 화면
await Promise.all([
  page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => b.innerText.trim() === "그만하기")
      ?.click();
  }),
  page.waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 }).catch(() => {}),
]);
await wait(1500);
await page.screenshot({ path: ".shot_result.png", fullPage: true });
console.log("result captured");

await browser.close();
