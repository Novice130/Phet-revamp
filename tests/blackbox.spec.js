import { test, expect } from "@playwright/test";

const cases = [
  {
    id: "acid-base-solutions",
    quizKeyword: /pH|acid|base/i,
  },
  {
    id: "bending-light",
    quizKeyword: /refraction|snell|lens|light/i,
  },
  {
    id: "balancing-chemical-equations",
    quizKeyword: /balance|atom|equation|coefficient/i,
  },
  {
    id: "greenhouse-effect",
    quizKeyword: /greenhouse|infrared|radiation|warming/i,
  },
  {
    id: "charges-and-fields",
    quizKeyword: /charge|electric|field|coulomb/i,
  },
  {
    id: "hookes-law",
    quizKeyword: /hooke|spring|kx|elastic/i,
  },
  {
    id: "gravity-and-orbits",
    quizKeyword: /orbit|gravity|mass|distance/i,
  },
  {
    id: "gases-intro",
    quizKeyword: /gas|pressure|volume|temperature|PV/i,
  },
  {
    id: "diffusion",
    quizKeyword: /diffusion|concentration|random/i,
  },
  {
    id: "curve-fitting",
    quizKeyword: /slope|graph|function|fit/i,
  },
  {
    id: "balancing-act",
    quizKeyword: /torque|pivot|balance/i,
  },
];

test.describe("Black-box verification of requested changes", () => {
  for (const c of cases) {
    test(`Simulation ${c.id}: quiz-only, no play button, learn/resources/examples`, async ({
      page,
    }) => {
      await page.goto(`simulation/${c.id}`);

      // Page loads and shows sections
      await expect(
        page.getByRole("heading", { level: 2, name: /what you'll learn/i })
      ).toBeVisible();
      await expect(page.locator(".objective-item")).toHaveCountGreaterThan(0);

      // No "Play the Game" popup/button (regression guard)
      await expect(page.getByText(/play the game/i)).toHaveCount(0);

      // Exactly one quiz rendered
      await expect(page.locator(".knowledge-quiz")).toHaveCount(1);

      // Quiz question is rendered and looks topic-relevant
      await expect(
        page.locator(".knowledge-quiz .question-text")
      ).toBeVisible();
      const questionText = await page
        .locator(".knowledge-quiz .question-text")
        .innerText();
      const optionTexts = await page
        .locator(".knowledge-quiz .quiz-option")
        .allInnerTexts();
      const combinedQuizText = `${questionText} ${optionTexts.join(" ")}`;
      expect(combinedQuizText).toMatch(c.quizKeyword);

      // Real-life examples: exactly 2, overlay text present
      await expect(page.locator(".examples-grid .example-card")).toHaveCount(2);
      // Images should load (not broken)
      const exampleImgs = page.locator(".examples-grid img.example-image");
      await expect(exampleImgs).toHaveCount(2);
      for (const el of await exampleImgs.elementHandles()) {
        await page.waitForFunction(
          (img) => img && img.complete && img.naturalWidth > 0,
          el,
          { timeout: 15000 }
        );
      }
      await expect(
        page.locator(".examples-grid .example-overlay-text")
      ).toHaveCount(2);
      for (const overlay of await page
        .locator(".examples-grid .example-overlay-text")
        .all()) {
        const t = (await overlay.innerText()).trim();
        expect(t.length).toBeGreaterThan(10);
      }

      // Formulas section should exist for topic-based enrichments (these test sims are all covered)
      await expect(
        page.getByRole("heading", { level: 2, name: /key formulas/i })
      ).toBeVisible();
      await expect(
        page.locator(".formulas-grid .formula-card")
      ).toHaveCountGreaterThan(0);

      // Resources section exists and links are not null/empty
      await expect(
        page.getByRole("heading", {
          level: 2,
          name: /more learning resources/i,
        })
      ).toBeVisible();
      const resourceLinks = page.locator(".resources-section .resource-item a");
      await expect(resourceLinks).toHaveCountGreaterThan(0);
      const hrefs = await resourceLinks.evaluateAll((as) =>
        as.map((a) => a.getAttribute("href"))
      );
      for (const href of hrefs) {
        expect(href).toBeTruthy();
        expect(String(href)).not.toBe("null");
      }
    });
  }
});

// Small helper: Playwright doesn't ship with this matcher by default.
expect.extend({
  async toHaveCountGreaterThan(locator, expected) {
    const count = await locator.count();
    const pass = count > expected;
    return {
      pass,
      message: () => `expected count > ${expected} but got ${count}`,
    };
  },
});
