import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Title from "../modules/login/component/Title";

import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../routes";

import ForgotPasswordModal from "../components/common/modals/ForgetPassModal";
import ContactAdminModal from "../components/common/modals/ContactAdminModal";
import CommonButton from "../components/common/widgets/CommonButton";
import CommonBackground from "../components/common/background/CommonBackground";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);
  const [isContactAdminModalOpen, setIsContactAdminModalOpen] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  const navigate = useNavigate();
  const { refresh } = useAuth();


  // const handleSubmit = async (e: React.FormEvent) => {
  async function handleSubmit(e: React.SubmitEvent){
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const session = await login(email, password);

      if (!session) {
        setError("Invalid email or password.");
        return;
      }

      await refresh();
      navigate(ROUTES.ROOT);
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ForgotPasswordModal
        open={isForgotPassModalOpen}
        onClose={() => setIsForgotPassModalOpen(false)}
      />

      <ContactAdminModal
        open={isContactAdminModalOpen}
        onClose={() => setIsContactAdminModalOpen(false)}
      />

      <CommonBackground className="min-h-screen sm:flex items-center justify-center px-4 py-8">


        <div className="w-full max-w-5xl lg:max-w-400 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-40 modal-open">

          <Title/>

          <section className="w-full max-w-125 bg-[#fdf8f5] rounded-3xl shadow-2xl px-10 py-10 mb-5">
            <p className="text-xs font-bold tracking-widest text-orange-500 mb-1">
              BARANGAY 176-E DRRMO/BHERT —
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sign In</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    className="w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800 mb-1.5"
                >
                  Security Key / Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full rounded-xl bg-white pl-10 pr-11 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                </div>
                <a
                  className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:cursor-pointer"
                  onClick={() => setIsForgotPassModalOpen(true)}
                >
                  Forgot password?
                </a>
              </div>

              <CommonButton
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2"
              >
                <Lock size={16} />
                {submitting ? "Signing in..." : "Sign In"}
              </CommonButton>

              <div className="flex justify-center">
                <CommonButton
                  type="button"
                  onClick={() => setIsContactAdminModalOpen(true)}
                  variant="none"
                  className="shadow-none font-medium! text-purple-600 hover:text-purple-800"
                >
                  Create Account
                </CommonButton>
              </div>
            </form>

          </section>
        </div>
      </CommonBackground>

    </>
  );
}
