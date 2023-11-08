import { expect, test } from "@playwright/test";
import { HomePage } from "../pages/home.page";

test.describe("Home Page", () => {
  let homePage: HomePage;
  const title = "Checkers - Games for the Brain";

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goToHomePage();
  });

  test("Open Home page and check title", async () => {
    await test.step("Verify Home page title", async () => {
      await expect(homePage.page).toHaveTitle(title);
    });
  });
});
