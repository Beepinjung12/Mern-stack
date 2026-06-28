import ExploreClient from "./ExploreClient";

export const metadata = {
  title: "Explore Rooms",
};

const popularCities = [
  { name: "Kathmandu", rooms: "1,280 rooms" },
  { name: "Pokhara", rooms: "860 rooms" },
  { name: "Chitwan", rooms: "520 rooms" },
  { name: "Lalitpur", rooms: "430 rooms" },
];

async function getSubmittedRooms() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/rooms`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ExplorePage() {
  const submittedRooms = await getSubmittedRooms();

  return (
    <ExploreClient
      popularCities={popularCities}
      submittedRooms={submittedRooms}
    />
  );
}