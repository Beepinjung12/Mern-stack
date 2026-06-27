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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        setProfile(res.data?.data ?? null);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
          Loading profile...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="bg-white text-red-500 px-8 py-6 rounded-2xl shadow-sm border border-red-100">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your account details
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full border border-emerald-100 capitalize">
            {profile?.role || "user"}
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-sky-400 to-sky-600" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 text-2xl font-bold">
                  {profile?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
              </div>
              <div className="flex-1 pb-1">
                <h2 className="text-xl font-bold text-slate-800">
                  {profile?.name}
                </h2>
                <p className="text-sm text-slate-400">{profile?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700">Edit Profile</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Update your personal information
            </p>
          </div>
          <div className="p-6">
            <EditProfileForm
              profile={profile}
              onProfileUpdated={handleProfileUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
