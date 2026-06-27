"use client";

import { useEffect, useState } from "react";
import { updateUserProfile } from "../../api/auth";

export default function EditProfileForm({ profile, onProfileUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        name: profile.name || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      // Build payload — only send fields that have values
      const payload = {};
      if (formData.name) payload.name = formData.name;
      if (formData.phone) payload.phone = formData.phone;
      if (formData.bio) payload.bio = formData.bio;

      // Include passwords only if user is changing password
      if (showPasswordSection) {
        if (!formData.currentPassword || !formData.newPassword) {
          alert("Both current and new password are required");
          setIsSaving(false);
          return;
        }
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const res = await updateUserProfile(payload);
      const updatedUser = res.data?.data;

      onProfileUpdated?.(updatedUser);

      // Update localStorage profile cache
      if (typeof window !== "undefined" && updatedUser) {
        localStorage.setItem("profile", JSON.stringify(updatedUser));
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);

      // Clear password fields after success
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
      setShowPasswordSection(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {showSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium border border-emerald-100">
            Profile updated successfully
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-slate-800"
              placeholder="Your Full Name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-slate-800"
              placeholder="98XXXXXXXX"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-slate-800 resize-none"
              placeholder="Tell us a bit about yourself"
            />
          </div>

          {/* Password Change Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              {showPasswordSection
                ? "Cancel password change"
                : "Change password?"}
            </button>
          </div>

          {/* Password Fields (conditional) */}
          {showPasswordSection && (
            <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-slate-800"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-slate-800"
                  placeholder="Enter new password (min 6 chars)"
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              if (profile) {
                setFormData({
                  name: profile.name || "",
                  phone: profile.phone || "",
                  bio: profile.bio || "",
                  currentPassword: "",
                  newPassword: "",
                });
                setShowPasswordSection(false);
              }
            }}
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors disabled:bg-sky-300 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
