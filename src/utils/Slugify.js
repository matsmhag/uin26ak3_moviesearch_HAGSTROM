export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function unslugify(slug) {
  return slug.replace(/-/g, " ");
}