import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/item_detail");
});

test("item_detailページに遷移したらバーコードリーダーが表示される", async ({
  page,
}) => {
  const barcordLeader = page.locator("#html5qr-code-full-region");
  await expect(barcordLeader).toBeVisible();
});

test.describe("OKボタンの状態", () => {
  test("アイテムIDを入力していないとOKを押せない", async ({ page }) => {
    const openBarcodeInputButton = page.getByRole("button").nth(1);
    const okButton = page.getByRole("button", { name: "OK" });
    const barcodeInput = page.getByRole("spinbutton");

    await openBarcodeInputButton.click();
    await barcodeInput.fill("");
    await expect(okButton).toBeDisabled();
  });

  test("アイテムIDを入力するとOKを押せる", async ({ page }) => {
    const openBarcodeInputButton = page.getByRole("button").nth(1);
    const okButton = page.getByRole("button", { name: "OK" });
    const barcodeInput = page.getByRole("spinbutton");

    await openBarcodeInputButton.click();
    await barcodeInput.fill("497288");
    await expect(okButton).toBeEnabled();
  });
});

test("ダイアログのキャンセルを押した時にダイアログが閉じる", async ({
  page,
}) => {
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const cancelButton = page.getByRole("button", { name: "キャンセル" });
  const dialogCancelButton = page.locator(
    "ibody > div.MuiDialog-root.MuiModal-root.css-126xj0f > div.MuiDialog-container.MuiDialog-scrollPaper.css-ekeie0 > div"
  );

  await openBarcodeInputButton.click();
  await cancelButton.click();

  await expect(dialogCancelButton).toBeHidden();
});

test("バーコードを読み込んだ時に、item_detail/[:id]に遷移する", async ({
  page,
}) => {
  const ITEM_ID = "497288";
  const openBarcodeInputButton = page.getByRole("button").nth(1);
  const okButton = page.getByRole("button", { name: "OK" });

  await openBarcodeInputButton.click();
  await page.getByRole("spinbutton").type(ITEM_ID);
  await okButton.click();

  await expect(page).toHaveURL(`/item_detail/${ITEM_ID}`);
});

test.describe("アイテム情報を正しく表示できる", () => {
  const ITEM_ID = 497288;
  const NAN_SUBCOLOR_ITEM_ID = 497269;
  const NAN_LOCATION_ITEM_ID = 497269;
  const FALSE_ISMARRIAGE_ITEM_ID = 497269;
  const FALSE_ISELASTICBAND_ITEM_ID = 482629;
  const NAM_REGDATE_ITEM_ID = 439593;

  test("アイテムの情報を取得できる", async ({ page }) => {
    const itemDetailCard = page.locator("body > div").filter({
      hasText:
        "肩身幅袖565967着丈股上7272サイズLアイテムID497288ランク・使用回数S・0棚C-12-上アイテムコードL-pcts-unsw-230807-01",
    });
    await page.goto(`/item_detail/${ITEM_ID}`);
    await expect(itemDetailCard).toBeVisible();
  });

  test("サブカラーがない時に”無し”と表示される", async ({ page }) => {
    await page.goto(`/item_detail/${NAN_SUBCOLOR_ITEM_ID}`);
    const itemSubcolorCell = page.locator(
      "body > div > div.MuiBox-root.css-b7rhyr > div > table:nth-child(10) > tbody"
    );
    await expect(itemSubcolorCell).toHaveText("無し");
  });

  test("棚がない時に”なし”と表示される", async ({ page }) => {
    await page.goto(`/item_detail/${NAN_LOCATION_ITEM_ID}`);
    const itemLocationCell = page.locator(
      "body > div > div.MuiBox-root.css-b7rhyr > div > table:nth-child(3) > tbody"
    );
    await expect(itemLocationCell).toHaveText("なし");
  });

  test("婚活フラグがfalseの時に”なし”と表示される", async ({ page }) => {
    await page.goto(`/item_detail/${FALSE_ISMARRIAGE_ITEM_ID}`);
    const itemLocationCell = page.locator(
      "body > div > div.MuiBox-root.css-b7rhyr > div > table:nth-child(13) > tbody"
    );
    await expect(itemLocationCell).toHaveText("なし");
  });

  test("ゴム紐フラグがfalseの時に”なし”と表示される", async ({ page }) => {
    await page.goto(`/item_detail/${FALSE_ISELASTICBAND_ITEM_ID}`);
    const itemLocationCell = page.locator(
      "body > div > div.MuiBox-root.css-b7rhyr > div > table:nth-child(14) > tbody"
    );
    await expect(itemLocationCell).toHaveText("なし");
  });

  test(' 登録日が存在しない時に""が表示される', async ({ page }) => {
    await page.goto(`/item_detail/${NAM_REGDATE_ITEM_ID}`);
    const itemLocationCell = page.locator(
      "body > div > div.MuiBox-root.css-b7rhyr > div > table:nth-child(19) > tbody"
    );
    await expect(itemLocationCell).toHaveText("");
  });
});
