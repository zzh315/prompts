"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompt");
      const data = await resp.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPosts = (search) => {
    return posts.filter((post) => {
      return (
        post.creator.username.toLowerCase().includes(search) ||
        post.prompt.toLowerCase().includes(search) ||
        post.tag.toLowerCase().includes(search)
      );
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        setFilteredPosts(filterPosts(query));
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  );
};
export default Feed;
