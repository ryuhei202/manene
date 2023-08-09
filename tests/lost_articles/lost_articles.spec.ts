import { expect, test } from "@playwright/test";

const INPUT_MESSAGE = "てすとてすと";
const INPUT_MEMBER_ID = "280094";

test.beforeEach(async ({ page }) => {
  await page.goto("/lost_articles");
});

test("パートナーIDと伝言メモが正しく表示される", async ({ page }) => {
  await expect(page.getByText("パートナーID")).toBeVisible();
  await expect(page.getByText("伝言メモ")).toBeVisible();
});

test.describe("パートナーIDに数値以外入力できない", () => {
  test("パートナーIDに、数値でない文字列は反映されない", async ({ page }) => {
    await page.locator("id=outlined-basic").type(INPUT_MESSAGE);
    await expect(page.locator("id=outlined-basic")).toBeEmpty();
  });

  test(" パートナーIDに数値のみの文字列は反映される", async ({ page }) => {
    await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
    await expect(page.locator("id=outlined-basic")).toHaveValue(
      INPUT_MEMBER_ID
    );
  });
});

test.describe("必要項目が入力されていないと登録ボタンが押せない", () => {
  test("パートナーIDが入力されていて、伝言メモが入力されていない時は登録ボタンが押せない", async ({
    page,
  }) => {
    await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
    await page.locator("id=outlined-multiline-flexible").type("");

    const locator = page.locator("button");
    await expect(locator).toBeDisabled();
  });

  test("パートナーIDが入力されておらず、伝言メモが入力されている時は登録ボタンが押せない", async ({
    page,
  }) => {
    await page.locator("id=outlined-basic").type("");
    await page.locator("id=outlined-multiline-flexible").type(INPUT_MESSAGE);

    const locator = page.locator("button");
    await expect(locator).toBeDisabled();
  });

  test(" パートナーIDと伝言メモがどちらとも入力されている時は登録ボタンを押すことができる", async ({
    page,
  }) => {
    await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
    await page.locator("id=outlined-multiline-flexible").type(INPUT_MESSAGE);

    const locator = page.locator("button");
    await expect(locator).toBeEnabled();
  });
});

test("登録ボタンを押したら、確認ダイアログが正しく表示される", async ({
  page,
}) => {
  await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
  await page.locator("id=outlined-multiline-flexible").type(INPUT_MESSAGE);

  await page.getByRole("button").click();
  await expect(page.locator("id=lost-articles-confirm-dialogs")).toBeVisible();
});

test("確認ダイアログでキャンセルボタンを押したら確認ダイアログが消える", async ({
  page,
}) => {
  await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
  await page.locator("id=outlined-multiline-flexible").type(INPUT_MESSAGE);

  await page.getByRole("button").click();
  await expect(page.locator("id=lost-articles-confirm-dialogs")).toBeVisible();

  await page.getByText("キャンセル").click();
  await expect(page.locator("id=lost-articles-confirm-dialogs")).toBeHidden();
});

test("確認ダイアログでOKを押したら完了ダイアログが表示される", async ({
  page,
}) => {
  await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
  await page.locator("id=outlined-multiline-flexible").type(INPUT_MESSAGE);

  await page.getByRole("button").click();
  await expect(page.locator("id=lost-articles-confirm-dialogs")).toBeVisible();

  await page.getByText("OK").click();
  await expect(page.locator("id=lost-articles-complete-dialogs")).toBeVisible();
});

test("完了ダイアログでOKを押したら初期画面に戻る", async ({ page }) => {
  await page.locator("id=outlined-basic").type(INPUT_MEMBER_ID);
  await page.locator("id=outlined-multiline-flexible").type(INPUT_MESSAGE);

  await page.getByRole("button").click();
  await expect(page.locator("id=lost-articles-confirm-dialogs")).toBeVisible();

  await page.getByText("OK").click();
  await expect(page.locator("id=lost-articles-complete-dialogs")).toBeVisible();

  await page.getByText("OK").click();
  await expect(page.locator("id=lost-articles-complete-dialogs")).toBeHidden();

  await expect(page.locator("id=outlined-basic")).toBeVisible();
  await expect(page.locator("id=outlined-multiline-flexible")).toBeVisible();

  await expect(page.locator("id=outlined-basic")).toBeEmpty();
  await expect(page.locator("id=outlined-multiline-flexible")).toBeEmpty();
});
