'use client';

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../../data/blogPosts";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const decodedCategory = decodeURIComponent(params.category as string);
  
  const categoryPosts = blogPosts.filter(post => {
    const postCategory = post.category.trim();
    const searchCategory = decodedCategory.trim();
    return postCategory === searchCategory;
  });

  if (categoryPosts.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">{decodedCategory}</h1>
        <p className="text-gray-400">Bu kategoride henüz yazı bulunmamaktadır.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">{decodedCategory}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <div className="blog-card rounded-lg overflow-hidden hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="content">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <span className="category-tag inline-block rounded-full px-3 py-1 text-sm">
                  {post.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 