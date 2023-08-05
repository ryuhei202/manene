import { expect, test } from "@playwright/test";

test("パートナーIDと伝言メモが正しく表示される", async ({ page }) => {
  await page.goto("/lost_articles");

  await expect(page.getByText("パートナーID")).toBeVisible();
  await expect(page.getByText("伝言メモ")).toBeVisible();
});

test("パートナーIDには数値のみしか入力できない", async ({ page }) => {
  await page.goto("/lost_articles");

  await page.locator("id=outlined-basic").fill("てすとてすと");
  await expect(page.locator("id=outlined-basic")).toBeEmpty();
});
