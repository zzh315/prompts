"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = () => {};

  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      console.log(response);
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
