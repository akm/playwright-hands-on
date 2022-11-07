import { chromium } from "playwright-core";

const main = async () => {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    slowMo: 1000,
  });
  const page = await browser.newPage();
  await page.goto("https://playwright.dev/");
  await page.pause();
  await page.locator("text=Get started").click();
  await page.pause();

  // Click text=Search⌘K
  await page.locator("text=Search⌘K").click();

  // Fill [placeholder="Search docs"]
  await page.locator('[placeholder="Search docs"]').fill("page");

  // Press Enter
  await page.locator('[placeholder="Search docs"]').press("Enter");
  await page.waitForURL("https://playwright.dev/docs/pages");

  await page.pause();

  await browser.close();
};

await main();
