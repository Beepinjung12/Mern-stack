import budgetRoom from "../../assets/budget.jpg";
import cozyRoom from "../../assets/cozy.avif";
import modernRoom from "../../assets/Modern.avif";
import sharedRoom from "../../assets/shared.avif";

export const rooms = [
  {
    image: modernRoom,
    badge: "Featured",
    title: "Modern studio near metro",
    location: "Thamel, Kathmandu",
    price: "Rs 12200",
    rating: "4.9",
    roomSize: "28 sqm",
    type: "Studio",
    description: "Bright studio apartment close to downtown transit.",
  },
  {
    image: cozyRoom,
    badge: "Popular",
    title: "Cozy single room, city view",
    location: "Lazimpat, Kathmandu",
    price: "Rs 6210",
    rating: "4.7",
    roomSize: "18 sqm",
    type: "Single bed",
    description: "Quiet single bedroom with city views and fast Wi-Fi.",
  },
  {
    image: sharedRoom,
    badge: "New",
    title: "Spacious shared apartment",
    location: "Patan, Lalitpur",
    price: "Rs 11180",
    rating: "4.8",
    roomSize: "15 sqm",
    type: "Shared",
    description: "Large shared apartment with a modern kitchen and laundry.",
  },
  {
    image: budgetRoom,
    badge: "Verified",
    title: "Budget room, near college",
    location: "Kirtipur, Kathmandu",
    price: "Rs 5095",
    rating: "4.5",
    roomSize: "12 sqm",
    type: "Near university",
    description: "Affordable room near campus with essential amenities.",
  },
];

export const categories = [
  "All rooms",
  "Studio",
  "Single bed",
  "Shared",
  "Near university",
];

export const priceOptions = [
  { value: "all", label: "Any price" },
  { value: "under5000", label: "Under Rs 5000" },
  { value: "500-1000", label: "Rs 5000 – Rs 10000" },
  { value: "1000+", label: "Rs 1000+" },
];

export function filterRooms({
  keyword = "",
  selectedCategory = "All rooms",
  selectedPrice = "all",
}) {
  return rooms.filter((room) => {
    const searchableText = [
      room.title,
      room.location,
      room.type,
      room.description,
    ]
      .join(" ")
      .toLowerCase();

    const matchesKeyword = keyword.trim()
      ? searchableText.includes(keyword.toLowerCase())
      : true;

    const numericPrice = Number(room.price.replace(/[^0-9]/g, ""));
    const matchesPrice =
      selectedPrice === "all" ||
      (selectedPrice === "under500" && numericPrice < 500) ||
      (selectedPrice === "500-1000" &&
        numericPrice >= 500 &&
        numericPrice <= 1000) ||
      (selectedPrice === "1000+" && numericPrice > 1000);

    const matchesCategory =
      selectedCategory === "All rooms" || room.type === selectedCategory;

    return matchesKeyword && matchesPrice && matchesCategory;
  });
}

export function searchRoomsByQuery(query, limit = 5) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return rooms
    .filter((room) =>
      [room.title, room.location, room.type, room.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    )
    .slice(0, limit);
}
