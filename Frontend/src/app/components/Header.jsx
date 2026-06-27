"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { logout as logoutApi } from "../api/auth";

const Header = () => {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuth(); // ← use context

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Backend logout failed");
    } finally {
      logout(); // ← clears context + storage
      router.push("/");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <nav
        className="sticky top-0 z-50 flex h-[60px] items-center justify-between border-b border-sky-100 bg-white/90 px-8 backdrop-blur-md"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Logo />

        <ul className="flex list-none gap-8">
          <li>
            <Link
              href="#"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              List Room
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-[14px] text-slate-500 no-underline transition hover:text-sky-600"
            >
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="rounded-full bg-sky-500 px-5 py-[7px] text-[13px] font-medium text-white no-underline transition hover:bg-sky-600"
              >
                {user?.name ? user.name.split(" ")[0] : "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-sky-300 px-4 py-[7px] text-[13px] font-medium text-sky-700 transition hover:bg-sky-50 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full border border-sky-300 px-4 py-[7px] text-[13px] font-medium text-sky-700 no-underline transition hover:bg-sky-50"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-sky-500 px-5 py-[7px] text-[13px] font-medium text-white no-underline transition hover:bg-sky-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
