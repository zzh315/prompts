"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id.toString()}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => post._id !== p._id);

        console.log(
          "🚀 ~ file: page.jsx:23 ~ handleDelete ~ filteredPosts:",
          filteredPosts
        );

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);

      const data = await response.json();
      if (session?.user.id) setPosts(data);
    };
    fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="View and edit your profile info here"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
