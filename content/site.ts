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
  intro: "Anything worth uploading or needing a UI is here",
  description: "Projects I've built and put online. Some are finished, some aren't.",
  links: [{ label: "GitHub", href: "https://github.com/parthivkurup" }],
};
