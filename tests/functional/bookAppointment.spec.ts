import { test, expect } from "@playwright/test";

test.describe("Make an appointment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page.locator("h3")).toContainText("We Care About Your Health");
    await expect(page.locator("#btn-make-appointment")).toContainText(
      "Make Appointment",
    );
    await page.getByRole("link", { name: "Make Appointment" }).click();
  });

  test("Error msg displayed when entered wrong username", async ({ page }) => {
    await page.getByLabel("Username").click();
    await expect(page.locator("#login")).toContainText(
      "Please login to make appointment.",
    );
    await expect(page.locator("form")).toContainText("Username");
    await expect(page.locator("form")).toContainText("Password");
    //   await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("jon Doe");
    //   await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });

  test("Login successfully", async ({ page }) => {
    await page.getByLabel("Username").click();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").click();
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("heading", { name: "Make Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });
});

test("Book an appointment", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await page.getByRole("link", { name: "Make Appointment" }).click();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("radio", { name: "None" }).check();
  await page.locator("span").click();
  await page.getByRole("cell", { name: "30" }).nth(1).click();
  await page.getByRole("textbox", { name: "Comment" }).click();
  await page.getByRole("textbox", { name: "Comment" }).fill("OPD visit");
  await page.getByRole("button", { name: "Book Appointment" }).click();
  await expect(page.locator("#summary")).toContainText(
    "Please be informed that your appointment has been booked as following:",
  );
  await expect(page.locator("#visit_date")).toMatchAriaSnapshot(
    `- paragraph: /\\d+\\/\\d+\\/\\d+/`,
  );
  await page.getByRole("link", { name: "Go to Homepage" }).click();
});
