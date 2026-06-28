"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaBed,
  FaShower,
  FaRulerCombined,
  FaHeart,
} from "react-icons/fa";

const heroHighlights = [
  { label: "Search", value: "Kathmandu" },
  { label: "When", value: "Available now" },
  { label: "Price", value: "Under Rs 15,000" },
];

const demoRoomListings = [
  {
    title: " Single Room in Thamel",
    location: "Thamel, Kathmandu",
    city: "Kathmandu",
    price: 12000,
    priceLabel: "Rs 12,000/mo",
    beds: 1,
    baths: 1,
    area: "220 sqft",
    img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Double Room in Lakeside",
    location: "Lakeside, Pokhara",
    city: "Pokhara",
    price: 14500,
    priceLabel: "Rs 14,500/mo",
    beds: 1,
    baths: 1,
    area: "260 sqft",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: " Shared Room in Patan",
    location: "Patan, Lalitpur",
    city: "Lalitpur",
    price: 9500,
    priceLabel: "Rs 9,500/mo",
    beds: 2,
    baths: 1,
    area: "315 sqft",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Single Room",
    location: "Rapti, Chitwan",
    city: "Chitwan",
    price: 10800,
    priceLabel: "Rs 10,800/mo",
    beds: 1,
    baths: 1,
    area: "240 sqft",
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
];

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80";

// Turns a raw submitted room (from the List Room form) into the shape the cards expect
function normalizeSubmittedRoom(room) {
  const rentNumber = Number(room.rent) || 0;
  // crude city guess from the location string, e.g. "POKHARA-10, KASKI" -> "Pokhara"
  const cityGuess = room.location
    ? room.location.split(",")[0].replace(/-\d+$/, "").trim()
    : "Unknown";

  return {
    id: room.id,
    title: room.title,
    location: room.location,
    city: cityGuess,
    price: rentNumber,
    priceLabel: `Rs ${rentNumber.toLocaleString()}/mo`,
    beds: room.rentType?.toLowerCase().includes("2") ? 2 : 1,
    baths: 1,
    area: "—",
    img: FALLBACK_IMG,
    contact: room.contact,
    whatsapp: room.whatsapp,
    tenancy: room.tenancy,
    facilities: room.facilities,
    parking: room.parking,
    isUserSubmitted: true,
  };
}

export default function ExploreClient({ popularCities, submittedRooms = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [maxPrice, setMaxPrice] = useState(15000);

  // Real listings first, then demo listings
  const roomListings = useMemo(() => {
    const normalized = submittedRooms.map(normalizeSubmittedRoom);
    return [...normalized, ...demoRoomListings];
  }, [submittedRooms]);

  const filterableCities = useMemo(
    () => ["All", ...new Set(roomListings.map((room) => room.city))],
    [roomListings]
  );
  const priceOptions = [15000, 12000, 10000, 8000];

  const filteredRooms = useMemo(() => {
    return roomListings.filter((room) => {
      const queryMatch = searchQuery
        ? room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          room.location.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const cityMatch = selectedCity === "All" || room.city === selectedCity;
      const priceMatch = room.price <= maxPrice;
      return queryMatch && cityMatch && priceMatch;
    });
  }, [roomListings, searchQuery, selectedCity, maxPrice]);

  return (
    <div
      style={{ minHeight: "100vh", background: "#f8fbff", color: "#1e293b" }}
    >
      <section
        style={{
          background:
            "linear-gradient(135deg, #0369a1 0%, #0ea5e9 55%, #7dd3fc 100%)",
          padding: "72px 24px 48px",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.85rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.85,
              marginBottom: 14,
            }}
          >
            Explore verified rooms
          </p>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              marginBottom: 18,
            }}
          >
            Find your next room with ease
          </h1>
          <p
            style={{
              maxWidth: 680,
              margin: "0 auto",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              opacity: 0.92,
            }}
          >
            Discover local rooms, view trusted listings, and connect directly
            with owners — all in one place.
          </p>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {heroHighlights.map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(255,255,255,0.14)",
                  borderRadius: 18,
                  padding: "18px 20px",
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    opacity: 0.84,
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </p>
                <strong style={{ fontSize: "1.05rem" }}>{item.value}</strong>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 34,
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="#listings"
              style={{
                background: "white",
                color: "#0369a1",
                padding: "14px 28px",
                borderRadius: 999,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Browse Rooms
            </Link>
            <Link
              href="/auth/signup"
              style={{
                background: "rgba(255,255,255,0.16)",
                color: "white",
                padding: "14px 28px",
                borderRadius: 999,
                fontWeight: 700,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              Start Free
            </Link>
          </div>
        </div>
      </section>

      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginBottom: 24,
          }}
        >
          {popularCities.map((city) => (
            <div
              key={city.name}
              style={{
                background: "white",
                borderRadius: 20,
                padding: "26px 24px",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <FaMapMarkerAlt size={20} color="#0369a1" />
                <h3
                  style={{ margin: 0, fontSize: "1.05rem", color: "#0f172a" }}
                >
                  {city.name}
                </h3>
              </div>
              <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
                {city.rooms}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 180px 180px",
              gap: 16,
              alignItems: "end",
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: "0.85rem", color: "#475569" }}>
                Search rooms
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title or location"
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1px solid #cbd5e1",
                  padding: "12px 14px",
                  fontSize: "0.95rem",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: "0.85rem", color: "#475569" }}>
                Filter by city
              </span>
              <select
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1px solid #cbd5e1",
                  padding: "12px 14px",
                  fontSize: "0.95rem",
                }}
              >
                {filterableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: "0.85rem", color: "#475569" }}>
                Max price
              </span>
              <select
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1px solid #cbd5e1",
                  padding: "12px 14px",
                  fontSize: "0.95rem",
                }}
              >
                {priceOptions.map((price) => (
                  <option key={price} value={price}>
                    Up to Rs {price.toLocaleString()}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
              Showing {filteredRooms.length} of {roomListings.length} rooms
            </p>
            <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
              Current max price: Rs {maxPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          id="listings"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {filteredRooms.map((room) => (
            <article
              key={room.id || room.title}
              style={{
                background: "white",
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: 220,
                  backgroundColor: "#e2e8f0",
                }}
              >
                <img
                  src={room.img}
                  alt={room.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.94)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <FaHeart color="#ef4444" />
                </button>
                {room.isUserSubmitted && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: "#0369a1",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    New listing
                  </span>
                )}
              </div>
              <div
                style={{
                  padding: "22px 22px 24px",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      color: "#0ea5e9",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {room.price <= 10000 ? "Great deal" : "Best value"}
                  </p>
                  <h2
                    style={{
                      margin: "10px 0 6px",
                      fontSize: "1.2rem",
                      lineHeight: 1.2,
                      color: "#0f172a",
                    }}
                  >
                    {room.title}
                  </h2>
                  <p
                    style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}
                  >
                    {room.location}
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 10,
                    marginTop: "auto",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.9rem",
                      color: "#475569",
                    }}
                  >
                    <FaBed size={14} />
                    <span>{room.beds} bed</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.9rem",
                      color: "#475569",
                    }}
                  >
                    <FaShower size={14} />
                    <span>{room.baths} bath</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: "0.9rem",
                      color: "#475569",
                    }}
                  >
                    <FaRulerCombined size={14} />
                    <span>{room.area}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {room.priceLabel}
                  </p>
                  <Link
                    href="#"
                    style={{
                      background: "#0ea5e9",
                      color: "white",
                      padding: "10px 18px",
                      borderRadius: 999,
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {filteredRooms.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                background: "white",
                borderRadius: 24,
                padding: "48px 28px",
                textAlign: "center",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.06)",
              }}
            >
              <p style={{ margin: 0, fontSize: "1rem", color: "#475569" }}>
                No rooms match your filters. Try changing city or max price.
              </p>
            </div>
          )}
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, #e0f2fe, #eff6ff)",
          padding: "56px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 24,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                color: "#0f172a",
                marginBottom: 18,
              }}
            >
              Search by location, budget, and amenities
            </h2>
            <p
              style={{
                color: "#475569",
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: 24,
              }}
            >
              Use our local room search to compare listings from verified
              owners, filter by price, and find options that fit your daily
              needs.
            </p>
            <Link
              href="/auth/signup"
              style={{
                display: "inline-block",
                background: "#0369a1",
                color: "white",
                padding: "14px 28px",
                borderRadius: 999,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Create your account
            </Link>
          </div>
          <div
            style={{
              minHeight: 320,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(15,23,42,0.08)",
            }}
          >
            <div
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80') center/cover",
                height: 320,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}