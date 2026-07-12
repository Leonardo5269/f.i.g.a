/** Join truthy class names. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Build an absolute URL from a path, using the configured site origin. */
export function absoluteUrl(path = "/"): string {
  const base = (
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
