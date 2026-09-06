import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { ROUTES } from "../../../routes";
import CommonInput from "../../../components/common/widgets/CommonInput";
import CommonButton from "../../../components/common/widgets/CommonButton";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface LoginCardProps {
  onForgotPassword: () => void;
  onCreateAccount: () => void;
}

export default function LoginCard({
  onForgotPassword,
  onCreateAccount,
}: LoginCardProps) {

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const success = await login(username, password);

      if (!success) {
        setError("Invalid username or password.");
        return;

      }

      navigate(ROUTES.ROOT);
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full max-w-125 bg-[#fdf8f5] rounded-3xl shadow-2xl px-10 py-10 mb-5">

      <p className="text-xs font-bold tracking-widest text-orange-500 mb-1">
        BARANGAY 176-E DRRMO/BHERT —
      </p>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <CommonInput
          id="name"
          label="Username"
          value={username}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          icon={<Mail size={18} />}
          className="border-none"
        />

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
              className="
                absolute left-3.5 top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="
                w-full rounded-xl bg-white
                pl-10 pr-11 py-3
                text-sm text-gray-800
                outline-none
                focus:ring-2 focus:ring-orange-400
                shadow-sm
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="
                absolute right-3.5 top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-gray-600
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword
                ? <EyeOff size={18} />
                : <Eye size={18} />
              }
            </button>

          </div>
        </div>

        <div className="flex justify-between">

          <div>
            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onForgotPassword}
            className="
              text-sm font-medium
              text-purple-600
              hover:text-purple-800
              hover:cursor-pointer
            "
          >
            Forgot password?
          </button>

        </div>

        <CommonButton
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2"
        >
          <Lock size={16} />

          {submitting
            ? "Signing in..."
            : "Sign In"
          }
        </CommonButton>

        <div className="flex justify-center">

          <CommonButton
            type="button"
            onClick={onCreateAccount}
            variant="none"
            className="
              shadow-none
              font-medium!
              text-purple-600
              hover:text-purple-800
            "
          >
            Create Account
          </CommonButton>

        </div>

      </form>

    </section>
  );
}
