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
      "Tracks frozen yoghurt promotions across Melbourne. An LLM extracts offers from what shops post; a person approves them before anything is public.",
    category: "Applications",
    technologies: ["Python", "Gemini", "PostgreSQL", "Docker", "Next.js", "TypeScript", "Tailwind CSS", "launchd"],
    status: "completed",
    thumbnail: "/projects/swirl/thumbnail.svg",
    liveUrl: { subdomain: "swirl" },
    deployed: false,
    deploymentNote:
      "Runs on my laptop for now. The public dashboard goes up here as a static build once publishing is wired.",
    githubUrl: "https://github.com/parthivkurup/swirl",
    lastUpdated: "2026-09-22",
    featured: true,
    overview: [
      "Swirl keeps a record of frozen yoghurt deals across Melbourne, so the ones available right now are findable in one place. It is built for me and a handful of friends: on a phone deciding where to go, or on a laptop planning ahead.",
      "It captures what shops post, has an LLM turn each post into structured offers, and publishes only what a person approved. The goal has two halves that sometimes pull against each other: everything shown is true, and nobody misses a deal. When they conflict, truth wins.",
    ],
    features: [
      "Public dashboard ranked by availability: available today and ending soon, available today, other days, not checked recently, ended.",
      "Keyboard-driven review queue (j, k, a, r) showing the raw capture beside every extracted field, all editable.",
      "Duplicates scored against the pending and approved pool before review, surfacing a repost as a hint rather than a second row.",
      "Nightly jobs expire, re-verify and merge deals. Merges supersede, with an undo, and never delete.",
      "Public photo submission for in-store promo signs. Submissions are never auto-approved.",
      "Scheduled ingestion twice a day on launchd, with structured JSON logging for every scrape and extract.",
    ],
    sections: [
      {
        title: "Two-stage pipeline",
        body: [
          "Scrapers only ever write immutable captures; they never touch deals. The extractor is a separate stage, so it can be re-run over all of history when the prompt changes, and every deal traces back to the text it came from.",
        ],
        steps: [
          { label: "Scrape", detail: "Shop posts and promo pages" },
          { label: "raw_captures", detail: "Immutable evidence" },
          { label: "Extract", detail: "Gemini, structured schema" },
          { label: "Pending", detail: "Deduped, hinted" },
          { label: "Review", detail: "A person decides" },
          { label: "Dashboard", detail: "Approved only" },
        ],
      },
      {
        title: "Honesty rules",
        body: [
          "These live in the product spec and in the schema, because the dashboard is only useful if people trust it enough to walk to a shop.",
        ],
        bullets: [
          "A price always carries its unit basis. $3 / 100g never renders as $3.",
          "A deal that can be re-fetched says \"checked\"; a one-off sighting says \"seen\". Staleness counts from the evidence date, not the approval date.",
          "Every deal has a scope. Anything not established as Melbourne never reaches the dashboard, and the one unattended publish path refuses it.",
          "Location is a named chain's locations or nothing. No store-level claims the data cannot back.",
          "Duplicates are superseded, never rejected or deleted, so a promo cannot be silently lost.",
        ],
      },
      {
        title: "Measuring the extractor honestly",
        body: [
          "The extractor is scored on in-sample fixtures, on a holdout the prompt never saw, and on an ablation set that forces offers out of images. The write-up in HOLDOUT.md records where earlier conclusions turned out to be wrong.",
        ],
        bullets: [
          "A silent-drop bug: an empty model response was rejected as malformed by the batch path, then accepted as \"no deals\" by the fallback it triggered. Captures were marked processed with no deal and no log line, which made every earlier zero-deal measurement ambiguous.",
          "Extractions are cached per caption, so a green test run with 0 API calls was verifying stored answers rather than the model. A bare test run is now cache-only and fails loudly on a miss.",
          "Batching several images into one request was tested and rejected after attributes bled between images.",
        ],
      },
      {
        title: "Development notes",
        bullets: [
          "Ingestion, extraction and the nightly jobs run on my own machine under launchd, with Postgres in Docker.",
          "The public repository is a sanitised copy. The Instagram source is private and stubbed, and holdout captions are excluded.",
          "Store-level data and menu prices are deliberately deferred. Deals are the product.",
        ],
      },
    ],
  },
];
