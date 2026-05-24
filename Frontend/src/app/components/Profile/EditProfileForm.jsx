"use client";
import { useState } from "react";

export default function EditProfileForm() {
  // 1. Local state holding form inputs
  const [formData, setFormData] = useState({
    name: "Bikash KC",
    phone: "+977 9834567890",
    bio: "CSIT Student | MERN Stack Developer",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle standard typing inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle immediate visula image preview when a user picks a file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localPreviewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, avatarUrl: localPreviewUrl }));
    }
  };

  // Simulate a form save action
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    // simulate network delay for UI/UX demonstration
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);

      // hide success notification automatically after 4 seconds
      setTimeout(() => setShowSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200">
            <img
              src={formData.avatarUrl}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2">
            <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <p className="text-xs text-slate-400">
              JPG, GIF or PNG. Max size of 2MB
            </p>
          </div>
        </div>

        {/* Frontend Success Notification Alert */}
        {showSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium border border-emerald-100 transition-all">
            Changes updated successfully
          </div>
        )}

        {/* Input Form Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {" "}
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent transition-all text-slate-800"
              placeholder="Your Full Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {" "}
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent transition-all text-slate-800"
              placeholder="+977 98XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {" "}
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent transition-all text-slate-800"
              placeholder="Tell room seekers or landowners a bit about yourself."
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            className="px-6 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button type="submit" disabled={isSaving} className="">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}