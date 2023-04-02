/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

/* eslint-disable @next/next/no-img-element */
const Banner = () => {
  const { status } = useSession();

  const router = useRouter();

  return (
    <div className="mt-5 flex h-screen items-center">
      <img src="/images/home-banner.webp" alt="banner" />
      <div className="flex h-full flex-col justify-center gap-3">
        <h1 className="font-poppin text-8xl font-bold text-secondary">
          Safe Haven
        </h1>
        <p className="max-w-[600px] font-poppin text-xl text-tert">
          Creating a Culture of Accountability and Transparency in the Workplace
        </p>
        <div className="flex gap-5 py-5">
          {status === "authenticated" ? null : (
            <button className="text-md rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-white">
              Register
            </button>
          )}
          <button
            className="text-md rounded-lg border-4 border-secondary px-6 py-3 font-poppin font-bold text-secondary"
            onClick={() => router.push("/dashboard")}
          >
            File Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
