"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10 w-full">
      <img
        src={
          session?.user?.image ||
          "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1713772755/mimir/logo-mimir_exh37o.png"
        }
        alt="user-logo"
        className="w-16 h-16 rounded-full border p-[2px]"
      />
      <div className="flex-1 ml-4">
        {" "}
        <h2>{session?.user?.username || "You're not logged in!!"}</h2>
        <h3 className="text-sm text-gray-200">Welcome to mimir</h3>
      </div>
      {session ? (
        <button
          onClick={signOut}
          className="text-blue-500 text-sm font-semibold"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={signIn}
          className="text-blue-500 text-sm font-semibold"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
