import { argv } from "process";
import { chromium } from "playwright-core";

const main = async () => {
  if (argv.length < 3) {
    console.error("Usage: node twitterer.mjs 'twitter account name'");
    return;
  }
  const name = argv[2];

  const browser = await chromium.launch({ channel: "chrome", headless: false });
  const page = await browser.newPage();
  await page.goto("https://twitter.com/" + name);
  await page.waitForLoadState();

  const result = await page
    .locator('[data-testid="UserDescription"]')
    .textContent();
  console.log("result: ", result);

  await browser.close();
};

await main();
