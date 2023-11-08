import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;
  readonly homeNavigation: Locator;
  readonly gameNameLocator = (title: string) =>
    this.homeNavigation.locator(`//a[normalize-space()="${title}"]`);

  constructor(page: Page) {
    this.page = page;
    this.homeNavigation = page.locator("[id=board]");
  }

  async goToHomePage() {
    await this.page.goto(process.env.BASE_URL!);
    await expect(this.homeNavigation).toBeVisible();
  }

  async openGame(title: string) {
    await this.gameNameLocator(title).click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
