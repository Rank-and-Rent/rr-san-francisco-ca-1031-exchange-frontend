import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: `Articles and insights about 1031 exchanges, property identification, and tax deferral strategies.`,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  // TODO: Replace with actual Sanity query
  const posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
  }> = [];

  return (
    <div className="bg-[#F7F5F2]">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/locations/1031-exchange-nob-hill-ca.jpg"
          alt="Blog"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <h1 className="font-[family-name:var(--font-playfair)] text-[32px] md:text-[42px] lg:text-[52px] font-normal tracking-[0.1em] uppercase text-white">
            Blog
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[16px] text-white/80">
            Articles and insights about 1031 exchanges and property identification.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-16 border border-[#E5E0D8] bg-white">
              <p className="font-[family-name:var(--font-playfair)] text-[24px] text-[#333] mb-4">
                Coming Soon
              </p>
              <p className="text-[14px] text-[#666]">
                We're preparing insightful articles about 1031 exchanges. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-[#E5E0D8] p-8 hover:border-[#5A2828] transition-colors"
                >
                  <time className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#888]">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="font-[family-name:var(--font-playfair)] text-[20px] font-normal text-[#333] group-hover:text-[#5A2828] transition-colors mt-3 mb-4">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-[#666] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A2828]">
                    Read More
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
