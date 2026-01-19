import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import Breadcrumbs from "@/components/Breadcrumbs";

type BlogPost = {
  title: string;
  excerpt: string;
  publishedAt: string;
  content: any;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // TODO: Replace with actual Sanity query
  // const post: BlogPost | null = await fetchPost(slug);
  const post: BlogPost | null = null;

  if (post === null) {
    return {
      title: "Post Not Found",
    };
  }

  const typedPost = post as BlogPost;
  return {
    title: `${typedPost.title} | ${SITE_NAME}`,
    description: typedPost.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // TODO: Replace with actual Sanity query
  // const post: BlogPost | null = await fetchPost(slug);
  const post: BlogPost | null = null;

  if (post === null) {
    notFound();
  }

  const typedPost = post as BlogPost;
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: typedPost.title, href: `/blog/${slug}` },
        ]}
      />

      <article>
        <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight text-[#0C1E2E] md:text-5xl">
          {typedPost.title}
        </h1>
        {typedPost.excerpt && (
          <p className="mb-8 text-lg text-[#1E1E1E]/80">{typedPost.excerpt}</p>
        )}
        <div className="mb-8 text-sm text-[#1E1E1E]/60">
          <time>{new Date(typedPost.publishedAt).toLocaleDateString()}</time>
        </div>
        <div className="prose prose-lg max-w-none text-[#1E1E1E]/80">
          <PortableText value={typedPost.content} />
        </div>
      </article>
    </div>
  );
}

