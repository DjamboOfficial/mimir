"use client";

import { app } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";

export default function CommentSection({ id }) {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const commentToPost = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  }

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts", id, "comments")),
      orderBy("timestamp", "desc"),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24  overflow-y-scroll">
          {comments.map((comment, id) => (
            <div
              key={id}
              className="flex items-center space-x-2 mb-2 justify-between"
            >
              <img
                src={comment.data().userImage}
                alt="user-image"
                className="h-7 rounded-full object-cover border p-[2px]"
              />
              <p className="text-sm flex-1 truncate">
                <span className="font-bold text-gray-700">
                  {comment.data().username}
                </span>
                {"  "}
                {comment.data().comment}
              </p>
              <Moment fromNow className="test-xs text-gray-400 pr-2">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form onSubmit={handleSubmit} className="flex items-center p-4 gap-2">
          <img
            src={session.user.image}
            alt="user-image"
            className="h-10 w-10 rounded-full border p-[4px] object-cover"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 focus:ring-0 outline-none"
          />
          <button
            className="text-blue-400 disabled:cursor-not-allowed disabled:text-gray-400"
            disabled={!comment.trim()}
            type="submit"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
