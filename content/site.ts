export const site = {
  /** Root domain, from the environment so preview and production can differ. */
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || undefined,
  wordmark: "parthiv",
  name: "Parthiv Kurup",
  title: "Parthiv Kurup · projects",
  intro: "A collection of things I've built, broken, tested and deployed.",
  description:
    "Things I've built, broken, tested and deployed. Apps, tools, experiments and half-finished ideas.",
  links: [{ label: "GitHub", href: "https://github.com/parthivkurup" }],
};
