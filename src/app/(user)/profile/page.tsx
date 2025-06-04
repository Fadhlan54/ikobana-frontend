"use client";

import ProfileDetail from "./ProfileDetail";

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 py-6">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Profil Pengguna</h1>

      <ProfileDetail />
    </div>
  );
}
