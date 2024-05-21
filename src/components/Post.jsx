"use client";

import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

export default function Post({ post, refreshPosts }) {
  const db = getFirestore();

  const handleDelete = async () => {
    const docRef = doc(db, "posts", post.id);
    try {
      await deleteDoc(docRef);
      console.log("Post deleted");
      // Refresh the posts after deletion
      refreshPosts();
    } catch (error) {
      console.error("Error removing post", error);
    }
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      handleDelete();
    }
  };

  return (
    <div className="bg-white mgy-7 border rounded-md">
      <div className="flex items-center p-5 border-b border-gray-100">
        <img
          src={post.profileImg}
          alt={post.username}
          className="h-12 rounded-full object-cover border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{post.username}</p>
        <HiOutlineDotsVertical
          className="h-5 cursor-pointer"
          onClick={confirmDelete}
        />
      </div>{" "}
      <img
        src={post.image}
        alt={post.caption}
        className="object-cover w-full"
      />
      <LikeSection id={post.id} />
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{post.username}</span>
        {post.caption}
      </p>
      <CommentSection id={post.id} />
    </div>
  );
}
