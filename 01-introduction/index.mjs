import { chromium } from "playwright-core";

const main = async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: false });
  const page = await browser.newPage();
  await page.goto("https://playwright.dev/");
  await page.pause();
  await browser.close();
};

await main();
