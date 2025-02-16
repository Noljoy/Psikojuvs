import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "../data/blogPosts";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-primary-purple/10">
      <div id="background-wrapper"></div>
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black mb-12 text-accent-gold tracking-[.25em] uppercase text-center">
            Blog Yazıları
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="glass-card rounded-lg overflow-hidden hover:translate-y-[-8px] transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-accent-gold">{post.title}</h2>
                    <p className="text-light-purple/80 mb-4 line-clamp-2">{post.excerpt}</p>
                    <span className="inline-block bg-accent-gold/20 text-accent-gold rounded-full px-3 py-1 text-sm font-semibold border border-accent-gold">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 