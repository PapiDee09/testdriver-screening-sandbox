import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("SauceDemo E2E", () => {
  it("logs in with sample credentials and adds an item to cart", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://www.saucedemo.com" });

    const loginPageVisible = await testdriver.assert("the Swag Labs login page is visible");
    expect(loginPageVisible).toBeTruthy();

    await testdriver.find("Username input field").click();
    await testdriver.type("standard_user");

    await testdriver.find("Password input field").click();
    await testdriver.type("secret_sauce");

    await testdriver.find("Login button").click();

    const inventoryPageVisible = await testdriver.assert("the Products inventory page is displayed");
    expect(inventoryPageVisible).toBeTruthy();

    // Dismiss browser password breach alert if present
    await testdriver.pressKeys(["Escape"]);

    await testdriver.find("Add to cart button for Sauce Labs Backpack").click();

    const badgeUpdated = await testdriver.assert("the shopping cart icon shows a badge with 1");
    expect(badgeUpdated).toBeTruthy();

    await testdriver.find("Shopping cart icon in the top right").click();

    const itemInCart = await testdriver.assert("the Your Cart page displays Sauce Labs Backpack");
    expect(itemInCart).toBeTruthy();
  });
});
