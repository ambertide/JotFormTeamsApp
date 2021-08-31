describe("Tabs Use Cases", () => {
  beforeEach(async () => {
    await page.goto("https://localhost:3000/#/tab");
  });

  jest.setTimeout(100000);

  it('should redirect to login upon entering."', async () => {
    await page.waitForSelector("form");
    await expect(page).toMatch("Sign In to JotForm");
    await expect(page).toFillForm('form[name="jotformSignIn"]', {
      username: "test",
      password: "test",
    });
    await expect(page).toClick("button", { text: "Sign In" });
    await page.waitForSelector("button");
  });

  it("should load ask for Azure login on forms page.", async () => {
    await expect(page).toClick("button", { text: "View and Share Polls" });
    await page.waitForSelector(".azureAdAuthDialog");
  });

  it("should have a form builder", async () => {
    await expect(page).toClick("button", { text: "Create New Poll" });
    await page.waitForSelector("#FormTitle");
  });

  it("should be able to logout", async () => {
    await expect(page).toClick("button", { text: "Log Out" });
    await page.waitForSelector('form[name="jotformSignIn"');
    await expect(page).toMatch("Sign In to JotForm");
  });
});
