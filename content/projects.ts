import type { Project } from "@/lib/types";

/**
 * The project registry. Adding a project = adding an object here (and,
 * optionally, a thumbnail under public/projects/<id>/). Nothing else in the
 * UI is project-specific. Order here only breaks ties; see getProjects().
 */
export const projects: Project[] = [
  {
    id: "swirl",
    name: "Swirl",
    description:
      "Finds frozen yoghurt deals around Melbourne. It reads what shops post, Gemini pulls out the offers, and I check them before they go up.",
    category: "Applications",
    technologies: ["Python", "Gemini", "PostgreSQL", "Docker", "Next.js", "TypeScript", "Tailwind CSS", "launchd"],
    status: "live",
    thumbnail: "/projects/swirl/thumbnail.svg",
    liveUrl: { subdomain: "swirl" },
    deployed: true,
    deploymentNote:
      "The scrapers and database run on my laptop. The public page is a static build that gets pushed to Cloudflare after each scrape and at midnight.",
    githubUrl: "https://github.com/parthivkurup/swirl",
    lastUpdated: "2026-11-03",
    featured: true,
    overview: [
      "I wanted one place to see which froyo shops in Melbourne had a deal on today. Most of them only post promos on Instagram, so I built something that reads those posts for me. It's for me and a few friends.",
      "Every post gets saved as it was, Gemini turns it into structured offers, and most of them wait for me to review before they show up. Deals straight from a chain's own website can go up automatically if the model is confident. I care more about the page being right than about it having everything, so anything I can't confirm gets marked or left off.",
    ],
    features: [
      "The front page sorts deals by whether you can use them today, then by how soon they end. Old or unconfirmed ones get pushed down and greyed out instead of hidden.",
      "A review queue I run from the keyboard (j and k to move, a to approve, r to reject). It shows the original post next to everything the model pulled out, and I can edit any field.",
      "Reposts get flagged as possible duplicates before I see them, so the same deal doesn't get listed twice.",
      "A nightly job expires old deals, re-checks the ones that have a source page, and merges duplicates. Merges can be undone and nothing gets deleted.",
      "A form for sending in a photo of a promo sign in a shop. It only runs locally for now.",
      "launchd runs the scrape twice a day, and every scrape and extract writes JSON logs.",
    ],
    sections: [
      {
        title: "How the pipeline works",
        body: [
          "The scrapers only save raw posts. They never write deals. Extraction is its own step, so when I change the prompt I can re-run it over every post I've saved, and any deal on the site can be traced back to the post it came from.",
        ],
        steps: [
          { label: "Scrape", detail: "Shop posts and promo pages" },
          { label: "raw_captures", detail: "Saved as-is" },
          { label: "Extract", detail: "Gemini, fixed schema" },
          { label: "Pending", detail: "Duplicates flagged" },
          { label: "Review", detail: "I check it" },
          { label: "Dashboard", detail: "Approved only" },
        ],
      },
      {
        title: "Rules for what the page shows",
        body: [
          "If someone's going to walk to a shop because of this page, it has to be right. These rules are written into the spec, and some are enforced by the database.",
        ],
        bullets: [
          "Prices always show their unit. If it's $3 per 100g it says $3 / 100g, never just $3.",
          "If I can re-check a deal's source page, it says \"checked\" with a date. If it came from a one-off photo it says \"seen\". How old a deal is gets worked out from when it was actually seen, not when I approved it.",
          "Every deal is tagged Melbourne, other or unknown. Anything tagged other never makes it onto the page, and the automatic publish path skips anything that isn't confirmed Melbourne.",
          "No store-level claims. A deal either says it's at all of a chain's locations or doesn't say where.",
          "Duplicates get merged, never rejected or deleted, so a real promo can't quietly disappear.",
        ],
      },
      {
        title: "Testing the extractor",
        body: [
          "I test it on the fixtures I wrote the prompt against, on a holdout set it never saw, and on a set where the offer only appears in an image. HOLDOUT.md has the full write-up, including the times I got it wrong.",
        ],
        bullets: [
          "There was a bug where an empty response from the model got counted as \"no deals\". The batch call rejected it as malformed, then the fallback accepted it. Posts were marked as processed with no deal and nothing in the logs, so every zero-deal result before the fix is suspect.",
          "Results are cached per caption. For a while a passing test run with 0 API calls just meant the cache matched, not that the model still worked. Now a plain test run only reads the cache and fails if anything's missing.",
          "I tried sending several images in one request. Details from one image started showing up in another, so I dropped it.",
        ],
      },
      {
        title: "Notes",
        bullets: [
          "The scrapers, extraction and nightly jobs run on my laptop through launchd, with Postgres in Docker.",
          "The GitHub repo is a cleaned-up copy. The Instagram scraper isn't in it and the holdout captions are left out.",
          "Store pages and menu prices aren't built yet. Deals came first.",
        ],
      },
    ],
  },
];
