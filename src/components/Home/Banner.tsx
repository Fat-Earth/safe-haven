/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

/* eslint-disable @next/next/no-img-element */
const Banner = () => {
  const { status } = useSession();

  const router = useRouter();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();
  const handleAuth = async () => {
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });

      const { message } = await requestChallengeAsync({
        address: account,
        chainId: chain.id,
      });

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/my-profile",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    } catch (e) {
      if (e.message.includes("Connector not found"))
        alert("Please Download Metamask!");
    }
  };

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
            <button className="text-md rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-white"
            onClick={handleAuth}
            >
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
