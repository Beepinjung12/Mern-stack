"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signup } from "../../api/auth";
import Link from "next/link";

export default function SignupPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      // CHANGED — payload keys: name, phone (not fullName, email)
      const payload = {
        name: data.name,
        phone: data.phone,
        password: data.password,
        role: isAdmin ? "admin" : "user",
        ...(isAdmin && { secretKey: data.secretKey }),
      };

      const res = await signup(payload);
      localStorage.setItem("token", res.data.token);

      router.push("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .signup-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0284c7, #7dd3fc);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        .signup-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }

        .signup-card {
          position: relative;
          z-index: 10;
          width: 360px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 32px 28px;
          box-shadow: 0 10px 40px rgba(3,105,161,0.2);
          animation: fadeIn 0.6s ease;
        }

        .logo-font {
          font-family: 'Playfair Display', serif;
          font-size: 26px;
          text-align: center;
          color: #0369a1;
        }

        .logo-font span { color: #38bdf8; }
      `}</style>

      <div className="signup-root">
        <div
          className="signup-circle"
          style={{ width: 200, height: 200, top: 30, left: 40 }}
        />
        <div
          className="signup-circle"
          style={{ width: 150, height: 150, bottom: 40, right: 60 }}
        />

        <div className="signup-card">
          <Link href="/" className="no-underline">
            <div className="logo-font">
              BASO<span>BAS</span>
            </div>
          </Link>

          <p className="text-center text-[13px] text-slate-500 mb-5 mt-1">
            Create your account
          </p>

          <div className="flex bg-sky-100 rounded-[30px] mb-5 overflow-hidden">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 text-[13px] text-center cursor-pointer transition-colors ${
                !isAdmin ? "bg-sky-500 text-white font-medium" : "text-sky-700"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 text-[13px] text-center cursor-pointer transition-colors ${
                isAdmin ? "bg-sky-500 text-white font-medium" : "text-sky-700"
              }`}
            >
              Owner
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* CHANGED — placeholder "Full Name" → "Name", register "name" */}
            <div className="mb-1">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] focus:border-sky-500 transition-colors"
                {...register("name", { required: "Name is required" })}
              />
              {/* CHANGED — errors.fullName → errors.name */}
              {errors.name && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* CHANGED — type="email" → type="tel", placeholder "Email" → "Phone", register "phone" */}
            <div className="mb-1">
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] focus:border-sky-500 transition-colors"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
              />
              {/* CHANGED — errors.email → errors.phone */}
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-1">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] focus:border-sky-500 transition-colors"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isAdmin && (
              <div className="mb-1">
                <input
                  type="text"
                  placeholder="Admin Secret Key"
                  className="w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] focus:border-sky-500 transition-colors"
                  {...register("secretKey", {
                    required: isAdmin ? "Secret key required for admin" : false,
                  })}
                />
                {errors.secretKey && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.secretKey.message}
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="mb-2 p-2 bg-red-50 text-red-600 text-[12px] rounded-lg text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-1 mt-[10px] bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-[10px] text-[14px] cursor-pointer transition-colors border-none"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-[13px] text-slate-500 mt-1">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-sky-600 font-medium no-underline hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
