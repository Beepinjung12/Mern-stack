import EditProfileForm from "../components/Profile/EditProfileForm";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page Headings */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your BasoBas public profile information and fields
          </p>
        </div>

        {/* Injecting Form Layout */}
        <EditProfileForm />
      </div>
    </div>
  );
}