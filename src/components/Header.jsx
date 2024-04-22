"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import Modal from "react-modal";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiCamera } from "react-icons/hi";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}

        <Link href="/" className="hidden lg:inline-flex">
          <Image
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1713772759/mimir/mimir-words_sxj8qz.png"
            width={100}
            height={100}
            alt="mimir-logo"
          />
        </Link>
        <Link href="/" className="lg:hidden">
          <Image
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1713772755/mimir/logo-mimir_exh37o.png"
            width={100}
            height={100}
            alt="mimir-logo"
          />
        </Link>

        {/* search bar */}

        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-20 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />

        {/* menu items */}

        {session ? (
          <>
            <div className="flex gap-2 items-center">
              <IoMdAddCircleOutline
                className="text-2xl cursor-pointer transform hover:scale-125 transition duration duration-300 hover:text-blue-600 "
                onClick={() => setIsOpen(true)}
              />
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={signOut}
              />
            </div>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold text-blue-500"
          >
            Log In
          </button>
        )}
      </div>
      {setIsOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <HiCamera className="text-5xl text-gray-400 cursor-pointer" />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Enter caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
          />
        </Modal>
      )}
    </div>
  );
}
