"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { RiStarFill } from "react-icons/ri";
import { filterRooms, categories, priceOptions } from "./roomData";

const Hero = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All rooms");
  const [selectedPrice, setSelectedPrice] = useState("all");

  const filteredRooms = useMemo(
    () => filterRooms({ keyword, selectedCategory, selectedPrice }),
    [keyword, selectedCategory, selectedPrice],
  );

  return (
    <section
      className="relative overflow-hidden px-8 py-[70px] pb-20 text-center max-md:px-4 max-md:py-12"
      style={{
        background: "linear-gradient(135deg, #0284c7, #38bdf8, #bae6fd)",
      }}
    >
      {/* BG circles */}
      <div className="absolute -right-20 -top-16 h-[340px] w-[340px] rounded-full bg-white/10" />
      <div className="absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full bg-white/10" />

      {/* Badge */}
      <div className="relative z-10 mb-5 inline-block rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[12px] font-medium uppercase tracking-[0.5px] text-white">
        Room Rental &amp; Booking
      </div>

      {/* Headline */}
      <h1
        className="relative z-10 mb-4 text-[44px] font-semibold leading-tight text-white max-lg:text-[34px] max-md:text-[28px]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Find your perfect <br />
        room, effortlessly
      </h1>

      {/* Subtext */}
      <p className="relative z-10 mb-9 text-[16px] font-light text-white/85 max-md:text-[14px]">
        Search thousands of verified rooms — for students, travelers, and
        professionals
      </p>

      {/* Search bar */}
      <div className="relative z-10 mx-auto w-full max-w-[620px] flex flex-col gap-3 rounded-3xl bg-white px-5 py-4 shadow-[0_4px_24px_rgba(3,105,161,0.18)] sm:flex-row sm:items-center sm:px-6 sm:rounded-full">
        <div className="flex w-full items-center gap-3 rounded-full bg-slate-50 px-4 py-3 sm:flex-1">
          <svg
            className="h-4 w-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            placeholder="Search by location, room type, or keywords..."
            className="w-full bg-transparent text-[14px] outline-none text-slate-700 placeholder-slate-400"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full rounded-full border border-sky-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none sm:w-auto"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className="w-full rounded-full border border-sky-200 bg-white px-4 py-3 text-[13px] text-slate-700 outline-none sm:w-auto"
        >
          {priceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Room Grid */}
      <div className="relative z-10 mx-auto mt-8 max-w-[1080px] text-left">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-white/80">
          <span>{filteredRooms.length} rooms available</span>
          <span>
            {selectedCategory === "All rooms"
              ? "All categories"
              : selectedCategory}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredRooms.map((room) => (
            <div
              key={room.title}
              className="overflow-hidden rounded-3xl border border-white/20 bg-white/95 shadow-sm"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.title}
                  className="h-full w-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold uppercase text-white">
                  {room.badge}
                </span>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-900">
                  {room.title}
                </h3>
                <p className="mb-2 text-[13px] text-slate-600">
                  {room.location}
                </p>
                <div className="flex items-center justify-between text-[13px] text-slate-500">
                  <span>{room.price}/mo</span>
                  <span className="inline-flex items-center gap-1 text-yellow-500">
                    <RiStarFill size={14} />
                    {room.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
