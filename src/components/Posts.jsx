"use client";

import React, { useState, useEffect } from "react";
import Post from "./Post";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default function Posts() {
  const db = getFirestore();
  const [posts, setPosts] = useState([]);

  // Fetch all posts from Firestore
  const fetchPosts = async () => {
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, orderBy("timestamp", "desc")); // Order posts by timestamp

    try {
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} refreshPosts={fetchPosts} />
      ))}
    </div>
  );
}
