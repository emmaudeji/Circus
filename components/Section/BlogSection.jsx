import React from 'react';
import Link from 'next/link';
import curatedBlogPosts from '@/data/blogPosts';
import Carousel from '../Slider/Carousel'; // Import the new carousel component
import BlogCard from '../Cards/BlogCard';

const BlogSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Recent News and Updates</h2>
        <Carousel Card={BlogCard} posts={curatedBlogPosts} />
        <div className="text-center mt-6">
          <Link href="/blog" className="text-orange-500 font-semibold hover:underline">View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
