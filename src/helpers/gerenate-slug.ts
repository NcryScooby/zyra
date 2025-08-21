import slugify from "slugify";

export function generateSlug(text: string) {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: "pt-BR",
    trim: true,
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
  });
}
