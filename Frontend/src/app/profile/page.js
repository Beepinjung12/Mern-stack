"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "../api/auth";
import EditProfileForm from "../components/profile/EditProfileForm";
export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();

      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await getUserProfile();
        // Your backend returns { success: true, data: user }
        setProfile(res.data?.data ?? null);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setTimeout(() => router.push("/auth/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-500">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">My Profile</h1>
        <p className="text-slate-500 mb-8">Manage your personal information</p>

        {/* Profile Summary Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xl font-bold">
              {profile?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                {profile?.name || "No name"}
              </h2>
              <p className="text-sm text-slate-500">
                {profile?.phone || "No phone"}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full capitalize">
                {profile?.role || "user"}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <EditProfileForm
          profile={profile}
          onProfileUpdated={handleProfileUpdated}
        />
      </div>
    </div>
  );
}
