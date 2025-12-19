import { test, expect } from "@playwright/test";

const priorityIds = [
  "arithmetic",
  "make-a-ten",
  "fractions-intro",
  "area-model-algebra",
  "area-model-decimals",
  "area-model-introduction",
  "circuit-construction-kit-ac",
  "circuit-construction-kit-dc",
  "acid-base-solutions",
  "forces-and-motion-basics",
];

test.describe("Priority simulation pages (visual/UX smoke)", () => {
  for (const id of priorityIds) {
    test(`Priority page ${id}: loads, images ok, quiz + leaderboard + play again`, async ({
      page,
    }) => {
      test.setTimeout(60_000);

      const pageErrors = [];
      page.on("pageerror", (e) => pageErrors.push(String(e)));

      await page.goto(`simulation/${id}`);

      // Page loads sections
      await expect(
        page.getByRole("heading", { level: 2, name: /real life examples/i })
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { level: 2, name: /test your knowledge/i })
      ).toBeVisible();

      // PhET iframe exists (content is cross-origin; just validate it is present and has a src)
      const iframe = page.locator(".simulation-container iframe");
      await expect(iframe).toHaveCount(1);

      // Overlay uses lazy-load: src is empty until the user clicks "Run Here".
      await expect(iframe).toHaveAttribute("data-src", /https?:\/\/.+/);
      await page.getByRole("button", { name: /run here/i }).click();
      await expect(iframe).toHaveAttribute("src", /https?:\/\/.+/);
      await expect(iframe).not.toHaveClass(/hidden/);

      // Real-life examples: 2 cards, 2 images load, and no attribution links
      await expect(page.locator(".examples-grid .example-card")).toHaveCount(2);
      await expect(
        page.locator(".examples-grid .example-attribution")
      ).toHaveCount(0);
      await expect(page.getByText(/image source/i)).toHaveCount(0);

      const exampleImgs = page.locator(".examples-grid img.example-image");
      await expect(exampleImgs).toHaveCount(2);
      // Images are lazy-loaded; ensure at least one is in view before asserting load.
      await exampleImgs.first().scrollIntoViewIfNeeded();
      for (const el of await exampleImgs.elementHandles()) {
        await page.waitForFunction(
          (img) => img && img.complete && img.naturalWidth > 0,
          el,
          { timeout: 15000 }
        );
      }

      // Quiz: answer 5 questions (no need to be correct; just verify flow works)
      await page
        .getByRole("heading", { level: 2, name: /test your knowledge/i })
        .scrollIntoViewIfNeeded();
      const quiz = page.locator(".knowledge-quiz");
      await expect(quiz).toHaveCount(1);
      const firstQuestionText = (
        await quiz.locator(".question-text").innerText()
      ).trim();

      for (let i = 0; i < 5; i++) {
        await expect(quiz.locator(".question-text")).toBeVisible();
        await expect(quiz.locator(".quiz-option")).toHaveCount(4);

        // Click the first option (deterministic)
        await quiz.locator(".quiz-option").first().click();
        await expect(quiz.locator(".quiz-feedback")).toBeVisible();

        // Next / results
        await quiz.locator(".quiz-next").click();
      }

      // Score view should show
      await expect(page.getByText(/out of 5/i)).toBeVisible();

      // Leaderboard should open and render without errors
      await quiz.getByRole("button", { name: /view leaderboard/i }).click();
      await expect(quiz.getByRole("button", { name: /back/i })).toBeVisible();

      // Go back to score
      await quiz.getByRole("button", { name: /^back$/i }).click();

      const playAgainBtn = quiz.getByRole("button", { name: /play again/i });
      await expect(playAgainBtn).toBeVisible();

      // Play again should restart the round (quiz view returns and progress resets).
      // We don't assert the first question *must* change because shuffling can repeat.
      await playAgainBtn.scrollIntoViewIfNeeded();
      await playAgainBtn.click();
      await expect(quiz.locator(".question-text")).toBeVisible();
      await expect(quiz.locator(".quiz-progress")).toBeVisible();
      await expect(quiz.locator(".quiz-progress")).toContainText(/\b1\b/);
      await expect(quiz.locator(".quiz-progress")).toContainText(/\b5\b/);

      // No unhandled JS errors
      expect(pageErrors, pageErrors.join("\n")).toEqual([]);
    });
  }
});
