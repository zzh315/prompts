"use client";

import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);

  //   const handleEdit = (post) => {
  //     router.push(`/update-prompt?id=${post._id.toString()}`);
  //   };

  //   const handleDelete = async (post) => {
  //     const hasConfirmed = confirm("Are you sure you want to delete this prompt");
  //     if (hasConfirmed) {
  //       try {
  //         await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
  //         const filteredPosts = posts.filter((p) => post._id !== p._id);

  //         setPosts(filteredPosts);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.userId}/posts`);
      if (!response.ok) {
        throw new Error("user not found");
      }
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const username = posts[0]?.creator.username;

  return (
    <Profile
      name={username ? `${username}'s` : "Loading"}
      desc="View and edit your profile info here"
      data={posts}
    />
  );
};

export default UserProfile;
