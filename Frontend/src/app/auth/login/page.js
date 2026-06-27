"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login as loginApi } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth(); // ← use context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const res = await loginApi({
        phone: data.phone,
        password: data.password,
      });
      const token = res.data?.token;
      const user = res.data?.user; // or however your backend returns it

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      login(token, user); // ← update context (Header updates instantly!)
      router.push("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
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

        .login-root {
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

        .login-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }

        .login-card {
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
          margin-bottom: 8px;
        }

        .logo-font span { color: #38bdf8; }

        .login-input:focus {
          border-color: #0ea5e9 !important;
          box-shadow: 0 0 0 2px rgba(14,165,233,0.15);
        }
      `}</style>

      <div className="login-root">
        <div
          className="login-circle"
          style={{ width: 200, height: 200, top: 30, left: 40 }}
        />
        <div
          className="login-circle"
          style={{ width: 150, height: 150, bottom: 40, right: 60 }}
        />

        <div className="login-card">
          <Link href="/" className="no-underline">
            <div className="logo-font">
              BASO<span>BAS</span>
            </div>
          </Link>

          <p className="text-center text-[13px] text-slate-500 mb-6">
            Welcome back! Login to continue
          </p>

          {error && (
            <div className="mb-3 p-2 bg-red-50 text-red-600 text-[12px] rounded-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* CHANGED — label from Email to Phone */}
            <div className="mb-1">
              <label className="block text-[12px] text-slate-500 mb-1">
                Phone Number
              </label>
              {/* CHANGED — type="tel", placeholder, register name "phone" */}
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="login-input w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] transition-all"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    // CHANGED — phone number regex instead of email regex
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-1">
              <label className="block text-[12px] text-slate-500 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="login-input w-full px-3 py-1 rounded-lg border border-sky-200 outline-none text-[14px] transition-all"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-[11px] mt-0.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center text-[12px] mb-1">
              <label className="flex items-center gap-1 text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sky-600 no-underline hover:underline"
              >
                Forgot?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-1 bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white rounded-[25px] text-[14px] font-medium cursor-pointer transition-colors border-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-[13px] text-slate-500 mt-1">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-sky-600 font-medium no-underline hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
