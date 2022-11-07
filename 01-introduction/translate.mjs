import { argv } from "process";
import { chromium } from "playwright-core";

const main = async () => {
  if (argv.length < 3) {
    console.error("Usage: node translate.mjs 'sentence to query'");
    return;
  }
  const q = argv[2];

  const browser = await chromium.launch({ channel: "chrome", headless: false });
  const page = await browser.newPage();
  await page.goto("https://translate.google.co.jp/?hl=ja");

  await page.locator('[aria-label="原文"]').click();
  await page.locator('[aria-label="原文"]').fill(q);
  await page.locator('[aria-label="原文"]').press("Enter");
  await page.locator("#i12").click();

  // １行で収まる場合
  const result1 = await page
    .locator(
      ':nth-match(div[aria-live="polite"] span[jsaction][jsname][lang="en"] span span[jsaction][jsname]:visible, 1)'
    )
    .textContent();
  console.log("result: ", result1);

  // 複数行ある場合
  const selector =
    'div[aria-live="polite"] span[lang="en"][jsname][jsaction] span span[jsaction][jsname]:visible';
  await page.locator(selector).waitFor({ strict: false });
  const result2 = await page.locator(selector).allTextContents();
  console.log("result: ", result2);

  await browser.close();
};

await main();
