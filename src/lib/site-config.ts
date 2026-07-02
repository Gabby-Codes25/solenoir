export const siteConfig = {
  name: "SoleNoir",
  shortName: "SoleNoir",
  tagline: "Unisex footwear & style, decoded.",
  description:
    "Honest reviews, buying guides, and outfit inspiration for sneakers, boots, bags, and everyday style — for everyone.",
  url: "https://example.com",
  email: "aliceukiwe13@gmail.com",
  social: {
    pinterest: "https://pinterest.com/yourbrand",
    instagram: "https://instagram.com/yourbrand",
  },
  categories: [
    {
      slug: "footwear",
      name: "Footwear",
      description: "Sneakers, boots, sandals, loafers, and running shoes.",
    },
    {
      slug: "clothing",
      name: "Clothing",
      description: "Streetwear and everyday fashion for men and women.",
    },
    {
      slug: "accessories",
      name: "Accessories",
      description: "Bags, watches, sunglasses, and jewelry.",
    },
    {
      slug: "fashion-tips",
      name: "Fashion Tips",
      description: "Outfit ideas, buying guides, and seasonal trends.",
    },
  ],
} as const;

export type CategorySlug = (typeof siteConfig.categories)[number]["slug"];
