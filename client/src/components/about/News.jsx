import React, { useState } from 'react';

const initialArticles = [
  {
    title: "Breaking News: React 18 Released",
    content: "React 18 introduces concurrent features to improve performance and user experience. Learn about the new updates and how they can benefit your projects.",
    date: "July 24, 2024",
  },
  {
    title: "Tailwind CSS: The New Standard for Styling",
    content: "Tailwind CSS has gained popularity for its utility-first approach. This article explores why it's a game-changer for modern web development.",
    date: "July 23, 2024",
  },
  {
    title: "Top 10 JavaScript Frameworks to Watch",
    content: "Discover the top JavaScript frameworks that are making waves in the development community. From React to Vue, see what's trending and why.",
    date: "July 22, 2024",
  },
  {
    title: "How to Use Hooks in React",
    content: "React Hooks allow you to use state and other React features without writing a class. This guide covers basic hooks and how to use them effectively.",
    date: "July 21, 2024",
  },
  {
    title: "Understanding Tailwind's Utility-First Approach",
    content: "Tailwind CSS's utility-first approach allows for more control over styling. This article dives into how it can streamline your development process.",
    date: "July 20, 2024",
  },
];

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    setFilteredArticles(
      initialArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">The Daily News</h1>
        <p className="text-lg text-gray-600">Stay updated with the latest news</p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </header>
      <main>
        {filteredArticles.length ? (
          filteredArticles.map((article, index) => (
            <article key={index} className="mb-8 p-6 bg-white shadow-md rounded">
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{article.date}</p>
              <p>{article.content}</p>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-600">No articles found</p>
        )}
      </main>
      <footer className="text-center text-gray-600 mt-8">
        <p>&copy; 2024 The Daily News</p>
      </footer>
    </div>
  );
};

export default News;
