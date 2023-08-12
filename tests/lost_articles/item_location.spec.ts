import { expect, test } from "@playwright/test";

const TEST_ITEM_ID = "497288";
const TEST_ITEM_SIZE = "L";
const TEST_ITEM_CATEGORY = `柄カットソー`;

test.beforeEach(async ({ page }) => {
  await page.goto("/item_location");
});

test("「アイテムスキャン」と「棚移動」のボタンが表示される", async ({
  page,
}) => {
  await expect(page.getByRole("button").nth(1)).toHaveText("アイテムスキャン");
  await expect(page.getByRole("button").nth(2)).toHaveText("棚移動");
});

test("アイテムを未スキャン状態だと、「棚移動」ボタンがdisabledになっている", async ({
  page,
}) => {
  await expect(
    page.getByRole("button", { name: "棚移動" }).nth(1)
  ).toBeDisabled();
});

test("アイテムをスキャンするとそのアイテムのカードが表示され、アイテムを追加するとリストに追加される。", async ({
  page,
}) => {
  const TEST_ITEM_ID_SECOND = "497220";
  const TEST_ITEM_SIZE_SECOND = "M";
  const TEST_ITEM_CATEGORY_SECOND = `無地Tシャツ`;

  const item_mini_card_locater1 = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(1) > div > div > p"
  );
  const item_mini_card_locater2 = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(2) > div > div > p"
  );

  await page.getByRole("button", { name: "アイテムスキャン" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(TEST_ITEM_ID);
  await page.getByRole("button", { name: "OK" }).click();

  await expect(item_mini_card_locater1.nth(0)).toHaveText(TEST_ITEM_ID);
  await expect(item_mini_card_locater1.nth(1)).toHaveText(
    `サイズ:${TEST_ITEM_SIZE}`
  );
  await expect(item_mini_card_locater1.nth(2)).toHaveText(
    `小カテ:${TEST_ITEM_CATEGORY}`
  );

  await page.getByRole("spinbutton").type(TEST_ITEM_ID_SECOND);
  await page.getByRole("button", { name: "OK" }).click();

  await expect(item_mini_card_locater2.nth(0)).toHaveText(TEST_ITEM_ID_SECOND);
  await expect(item_mini_card_locater2.nth(1)).toHaveText(
    `サイズ:${TEST_ITEM_SIZE_SECOND}`
  );
  await expect(item_mini_card_locater2.nth(2)).toHaveText(
    `小カテ:${TEST_ITEM_CATEGORY_SECOND}`
  );
});

test("同じアイテムを追加すると「このアイテムは既に読み取り済みです」とアラートダイアルグが表示され、アイテムリストに追加されない", async ({
  page,
}) => {
  const ERROR_MESSAGE = "このアイテムは既に読み取り済みです";
  const item_mini_card_locater1 = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(1) > div > div > p"
  );
  const item_mini_card_locater2 = page.locator(
    "body > section > div.MuiBox-root.css-ncs2ti > div:nth-child(2)"
  );

  await page.getByRole("button", { name: "アイテムスキャン" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(TEST_ITEM_ID);
  await page.getByRole("button", { name: "OK" }).click();

  await expect(item_mini_card_locater1.nth(0)).toHaveText(TEST_ITEM_ID);
  await expect(item_mini_card_locater1.nth(1)).toHaveText(
    `サイズ:${TEST_ITEM_SIZE}`
  );
  await expect(item_mini_card_locater1.nth(2)).toHaveText(
    `小カテ:${TEST_ITEM_CATEGORY}`
  );

  await page.getByRole("spinbutton").type(TEST_ITEM_ID);
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain(ERROR_MESSAGE);
    await dialog.accept();
  });
  await page.getByRole("button", { name: "OK" }).click();

  await expect(await item_mini_card_locater2.count()).toEqual(0);
});

test("追加したアイテムを棚移動するとアイテムがその棚に登録され、アイテムリストが空になる", async ({
  page,
}) => {
  const VALID_LOCATION_ID = "10001";

  await page.getByRole("button", { name: "アイテムスキャン" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(TEST_ITEM_ID);
  await page.getByRole("button", { name: "OK" }).click();

  await expect(await page.getByText(TEST_ITEM_ID)).toBeVisible();

  await page.getByRole("button", { name: "キャンセル" }).click();
  await page.goBack();
  await page.getByRole("button", { name: "棚移動" }).nth(1).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(VALID_LOCATION_ID);
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await expect(await page.getByText(TEST_ITEM_ID).count()).toEqual(0);
});

test("棚移動に失敗すると、「登録に失敗しました」というアラートダイアログが表示される", async ({
  page,
}) => {
  const INVALID_LOCATION_ID = "999999999";
  const ERROR_MESSAGE = "登録に失敗しました";
  await page.getByRole("button", { name: "アイテムスキャン" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(TEST_ITEM_ID);
  await page.getByRole("button", { name: "OK" }).click();

  await expect(await page.getByText(TEST_ITEM_ID)).toBeVisible();

  await page.getByRole("button", { name: "キャンセル" }).click();
  await page.goBack();
  await page.getByRole("button", { name: "棚移動" }).nth(1).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(INVALID_LOCATION_ID);
  await page.getByRole("button", { name: "OK" }).click();
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toContain("alert");
    expect(dialog.message()).toContain(ERROR_MESSAGE);
    await dialog.accept();
  });
  await page.getByRole("button", { name: "OK" }).click();
  await page.waitForTimeout(1000);
  await expect(await page.getByText(TEST_ITEM_ID).count()).toEqual(1);
});

test("アイテムを選択するとアイテム詳細カードが表示される", async ({ page }) => {
  const item_mini_card_locater = page
    .locator("div")
    .filter({ hasText: "497288サイズ:L小カテ:柄カットソー棚:C-12-上" })
    .nth(2);

  const item_detail_card_locater = page
    .locator("div")
    .filter({
      hasText:
        "肩身幅袖565967着丈股上7272サイズLアイテムID497288ランク・使用回数S・0棚C-12-上アイテムコードL-pcts-unsw-230807-01",
    })
    .nth(3);

  await page.getByRole("button", { name: "アイテムスキャン" }).click();
  await page.getByRole("button").nth(1).click();
  await page.getByRole("spinbutton").type(TEST_ITEM_ID);
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByRole("button", { name: "キャンセル" }).click();
  await page.goBack();
  await item_mini_card_locater.click();

  await expect(item_detail_card_locater).toBeVisible();
  await expect(page.getByRole("cell", { name: "L", exact: true })).toHaveText(
    TEST_ITEM_SIZE
  );
  await expect(page.getByRole("cell", { name: "497288" })).toHaveText(
    TEST_ITEM_ID
  );
  await expect(page.getByRole("cell", { name: "柄カットソー" })).toHaveText(
    TEST_ITEM_CATEGORY
  );
});
