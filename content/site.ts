/**
 * Root domain, from the environment so preview and production can differ.
 * Tolerates a pasted URL ("https://x.dev/") and fails the build with a plain
 * message on anything that is not a bare hostname.
 */
function readDomain(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_DOMAIN?.trim();
  if (!raw) return undefined;
  const host = raw.replace(/^https?:\/\//, "").replace(/\/+$/, "").toLowerCase();
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host)) {
    throw new Error(
      `NEXT_PUBLIC_SITE_DOMAIN must be a bare domain like "parthivkurup.dev", got "${raw}"`,
    );
  }
  return host;
}

export const site = {
  domain: readDomain(),
  wordmark: "parthiv",
  name: "Parthiv Kurup",
  title: "Parthiv Kurup · projects",
  intro: "A collection of things I've built, broken, tested and deployed.",
  description:
    "Things I've built, broken, tested and deployed. Apps, tools, experiments and half-finished ideas.",
  links: [{ label: "GitHub", href: "https://github.com/parthivkurup" }],
};
