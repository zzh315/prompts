"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const fetchPrompt = async () => {
      const resp = await fetch(`/api/prompt/${promptId}`);

      const data = await resp.json();
      setPost(data);
    };
    if (promptId) fetchPrompt();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log("🚀 ~ file: page.jsx:42 ~ updatePrompt ~ error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
