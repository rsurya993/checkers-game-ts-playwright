import { Locator, Page, expect } from "@playwright/test";

export class CheckersPage {
  page: Page;
  readonly gameCheckerName: Locator;
  readonly checkersBoard: Locator;
  readonly bluePieceMoving: Locator;
  readonly piecePosition = (position: number) => `img[name="space${position}"]`;
  readonly confirmationMessageLocator = (message: string) =>
    `#message:has-text("${message}")`;
  readonly restartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gameCheckerName = page.locator('h1:has-text("Checkers")');
    this.checkersBoard = page.locator("#board");
    this.bluePieceMoving = page.locator(
      'img[src="https://www.gamesforthebrain.com/game/checkers/me2.gif"]'
    );
    this.restartButton = page.locator("text=Restart");
  }

  async confirmationMessage(expectedMessage: string) {
    return await expect(
      this.page.locator(this.confirmationMessageLocator(expectedMessage))
    ).toBeVisible();
  }

  async takeBluePiece(initialPosition: number) {
    // Verify orange piece is not selected
    await expect(
      this.page.locator(this.piecePosition(initialPosition))
    ).toHaveAttribute("src", "me1.gif");

    // Click on blue piece on the cell at position (x, y)
    await this.page
      .locator(this.piecePosition(initialPosition))
      .click({ delay: 1000 });
  }

  async takeOrangePieceAndAwaitBlue(
    initialPosition: number,
    finalPosition: number
  ) {
    const messageMakeAMove = this.confirmationMessageLocator("Make a move.");
    // Verify orange piece is not selected
    await expect(
      this.page.locator(this.piecePosition(initialPosition))
    ).toHaveAttribute("src", "you1.gif");

    // Click and select orange on the cell at position (x, y)
    await this.page
      .locator(this.piecePosition(initialPosition))
      .click({ delay: 1000 });

    // Wait for the orange piece has been selected
    await expect(
      this.page.locator(this.piecePosition(initialPosition))
    ).toHaveAttribute("src", "you2.gif");

    // Move the orange piece to the cell at position (x, y)
    await this.page.locator(this.piecePosition(finalPosition)).click();

    // Wait for the orange piece to be unselected
    await expect(
      this.page.locator(this.piecePosition(finalPosition))
    ).toHaveAttribute("src", "you1.gif");

    // Wait for any cell to turn blue
    await this.page.locator(messageMakeAMove).isVisible();
  }
}
