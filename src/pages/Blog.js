import './Blog.css';
import React, { useEffect, useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 3; // Display 3 posts per page

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://thefinigma.com/wp-json/wp/v2/posts?per_page=${postsPerPage}&page=${currentPage}`);
        const data = await response.json();
        const totalPosts = response.headers.get('X-WP-Total');
        setTotalPages(Math.ceil(totalPosts / postsPerPage));
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="blog-container">
      <h1>Latest Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{decodeHTML(post.title.rendered)}</h2>
            <div dangerouslySetInnerHTML={{ __html: decodeHTML(post.excerpt.rendered) }} />
            <a href={post.link} target="_blank" rel="noopener noreferrer">Read More</a>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

const decodeHTML = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export default Blog;
