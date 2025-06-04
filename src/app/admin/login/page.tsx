import Image from "next/image";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="w-full max-w-md mx-4">
        <div className="space-y-6 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col items-center">
            {/* Replace with your admin panel logo */}
            <div className="mb-4">
              <Image
                src="/images/Logo Ikobana.png"
                alt="Admin Panel"
                width={120}
                height={120}
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Sign in to your admin account</p>
          </div>

          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
