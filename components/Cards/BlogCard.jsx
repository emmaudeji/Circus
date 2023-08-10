import Link from "next/link";

const BlogCard = ({ title, date, imageSrc, slug }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 mx-3">
        <img src={imageSrc} alt={title} className="mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{date}</p>
        <Link href={`/blog/${slug}`} className="text-orange-500 font-semibold hover:underline">Read More
        </Link>
      </div>
    );
}

export default BlogCard