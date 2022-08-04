import { chromium } from "playwright-core";

const main = async () => {
  const browser = await chromium.launch({channel: "chrome", headless: false});
  const page = await browser.newPage();
  await page.goto("https://playwright.dev/");
  await page.pause();
  console.log("exit");
  await page.close();
}

await main();
