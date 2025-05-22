"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/app/aceternity/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";

export default function SignupFormDemo() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleCredentialsLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email.trim(),
      password: password.trim(),
    });

    if (result?.ok) {
      router.push("/");
    } else {
      setError("Invalid credentials. Please check your email and password.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        router.push("/");
      }
    } catch {
      setError("Error during Google authentication. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black pt-6 sm:py-24 px-4 sm:px-6 lg:px-8 font-manrope">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl rounded-xl bg-white dark:bg-black shadow-lg p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
          Login to Nishat
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 text-center max-w-md mx-auto">
          Login with your credentials or Google account
        </p>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        <form className="my-6 sm:my-8 space-y-6" onSubmit={handleCredentialsLogin}>
          <LabelInputContainer className="mb-4 sm:mb-6">
            <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="w-full p-3 text-sm sm:text-base"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 sm:mb-6">
            <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full p-3 text-sm sm:text-base"
            />
          </LabelInputContainer>

          <button
            className="group/btn relative w-full h-11 sm:h-12 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white text-sm sm:text-base hover:from-neutral-800 hover:to-neutral-500 transition-all duration-300"
            type="submit"
          >
            Login →
            <BottomGradient />
          </button>
        </form>

        <div className="my-6 sm:my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex h-11 sm:h-12 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 dark:bg-zinc-900 px-4 font-medium text-black dark:text-neutral-300 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all duration-300"
            type="button"
            onClick={handleGoogleSignIn}
          >
            <IconBrandGoogle className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
            <span>Continue with Google</span>
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);