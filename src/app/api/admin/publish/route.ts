import { NextRequest, NextResponse } from "next/server";
import { isValidSessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-auth";

type PublishPayload = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  author: string;
  keywords: string;
  body: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function buildMdx(payload: PublishPayload): string {
  const publishedAt = new Date().toISOString().split("T")[0];
  const keywordsList = payload.keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .map((k) => `"${k}"`)
    .join(", ");

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(payload.title)}`,
    `slug: ${JSON.stringify(payload.slug)}`,
    `excerpt: ${JSON.stringify(payload.excerpt)}`,
    `category: ${JSON.stringify(payload.category)}`,
    `coverImage: ${JSON.stringify(payload.coverImage)}`,
    `publishedAt: ${JSON.stringify(publishedAt)}`,
    `author: ${JSON.stringify(payload.author || "Editorial Team")}`,
    `keywords: [${keywordsList}]`,
    "---",
    "",
  ].join("\n");

  return frontmatter + payload.body;
}

export async function POST(request: NextRequest) {
  // 1. Check the writer is actually logged in.
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!isValidSessionToken(sessionToken)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const payload = (await request.json()) as PublishPayload;

  if (!payload.title || !payload.body || !payload.category) {
    return NextResponse.json(
      { error: "Title, category, and body are required." },
      { status: 400 }
    );
  }

  const slug = slugify(payload.slug || payload.title);
  const filePath = `src/content/blog/${slug}.mdx`;
  const fileContent = buildMdx({ ...payload, slug });

  const githubToken = process.env.GITHUB_COMMIT_TOKEN;
  const repo = process.env.GITHUB_REPO; 
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!githubToken || !repo) {
    return NextResponse.json(
      { error: "Server is not configured. GITHUB_COMMIT_TOKEN or GITHUB_REPO is missing." },
      { status: 500 }
    );
  }

  const githubApiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

  const commitResponse = await fetch(githubApiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add article: ${payload.title}`,
      content: Buffer.from(fileContent, "utf-8").toString("base64"),
      branch,
    }),
  });

  if (!commitResponse.ok) {
    const errorData = await commitResponse.json().catch(() => ({}));
    return NextResponse.json(
      {
        error: `GitHub commit failed: ${errorData.message || commitResponse.statusText}`,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, slug });
}
