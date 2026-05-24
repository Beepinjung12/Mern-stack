"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const Header = () => {
  // Frontend-only state toggles to switch views or toggle dropdown layout
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown menu if user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    /* ================= NAVBAR ================= */
    <nav className="sticky top-0 z-50 flex h[60px] items-center justify-between border-b border-sky-200 bg-white/90 px-8 backdrop-blur-md max-md:h-auto max-md:flex-wrap max-md:px-4 max-md:py-3">
      <Logo />

      {/* LINKS */}
      <ul className="flex list-none gap-8 max-md:mt-3 max-md:w-full max-md:justify-center max-md:gap-4">
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            Explore
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            List Room
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-[14px] text-slate-500 transition hover:text-sky-600"
          >
            About
          </Link>
        </li>
      </ul>

      {/* ACTIONS */}
      <div className="flex items-center gap-3 max-md:mt-3 max-md:w-full max-md:justify-center">
        {!isLoggedIn ? (
          <>
            <Link
              href="/auth/login"
              className="rounded-full border border-sky-300 px-4 py[7px] text-[13px] font-medium text-sky-700 transition hover:bg-sky-100"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-sky-500 px-5 py[7px] text-[13px] font-medium text-white transition hover:bg-sky-600"
            >
              Sign Up
            </Link>
          </>
        ) : (
          /* PROFILE DROPDOWN MENU */
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-full p-0.5 hover:bg-slate-50 transition focus:outline-none"
            >
              <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-sky-500">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                  alt="User Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* DROPDOWN EXPANDED OVERLAY */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-sky-100 bg-white py-1.5 shadow-lg z-50">
                <div className="p-1">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-slate-600 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition"
                  >
                    <span>👤</span> Edit Profile
                  </Link>
                  <Link
                    href="#"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 text-[13px] text-slate-600 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition"
                  >
                    <span>🏠</span> My Listings
                  </Link>
                </div>

                <div className="mt-1 border-t border-slate-100 p-1">
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[13px] text-rose-600 rounded-lg hover:bg-rose-50 transition font-medium text-left"
                  >
                    <span>🚪</span> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;