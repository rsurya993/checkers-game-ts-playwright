import { test as base } from "@playwright/test";
import { expect } from "@playwright/test";
import { CheckersPage } from "../../pages/games/checkers.page";
import { HomePage } from "../../pages/home.page";

// Declare the types of fixtures.
type TestFixtures = {
  homePage: HomePage;
  checkersPage: CheckersPage;
};

// Extend the base test type with the fixture types.
const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();
    await use(homePage);
  },
  checkersPage: async ({ homePage }, use) => {
    await homePage.openGame("Checkers");
    const checkersPage = new CheckersPage(homePage.page);
    await use(checkersPage);
  },
});

test.describe("Checkers Page Testing", () => {
  const title = "Checkers - Games for the Brain";
  const startGameMessage = "Select an orange piece to move.";
  const takeBluePieceMessage =
    "Click on your orange piece, then click where you want to move it.";
  const orangeMoves = [
    { initial: 62, final: 73 },
    { initial: 71, final: 62 },
    { initial: 60, final: 71 },
    { initial: 22, final: 13 },
    { initial: 31, final: 22 },
  ];
  const blueMove = 75;

  test("Verify Checkers game page title and board", async ({
    checkersPage,
  }) => {
    await test.step("Verify Home page title", async () => {
      await expect(checkersPage.page).toHaveTitle(title);
    });
    await test.step("Verify board is exist", async () => {
      await expect(checkersPage.checkersBoard).toBeVisible();
    });
  });

  test("The Checkers Game", async ({ checkersPage }) => {
    await test.step("Verify game name is Checker", async () => {
      await expect(checkersPage.gameCheckerName).toBeVisible();
    });
    await test.step("Verify new game message", async () => {
      await checkersPage.confirmationMessage(startGameMessage);
    });
    await test.step("Verify take blue piece message", async () => {
      await checkersPage.takeBluePiece(blueMove);
      await checkersPage.confirmationMessage(takeBluePieceMessage);
    });
    await test.step("Make five moves as orange", async () => {
      for (let i = 0; i < orangeMoves.length; i++) {
        await test.step(`Make move ${i + 1} as orange`, async () => {
          const { initial, final } = orangeMoves[i];
          await checkersPage.takeOrangePieceAndAwaitBlue(initial, final);
        });
      }
    });
    await test.step("Restart the game after five moves", async () => {
      await checkersPage.restartButton.click();
    });
    await test.step("Confirm that the restarting had been successful", async () => {
      expect(
        await checkersPage.page
          .locator(checkersPage.confirmationMessageLocator(startGameMessage))
          .isVisible()
      );
    });
  });
});
