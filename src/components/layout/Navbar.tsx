/* eslint-disable @typescript-eslint/no-misused-promises */
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useSession, signOut } from "next-auth/react";
import Home from "~/pages";

const Navbar = () => {
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

  const session = useSession();
  if (session.status === "loading") {
    return null;
  }

  return (
    <div className="fixed top-0 w-full bg-primary shadow-md">
      <div
        onClick={() => push("/")}
        className="mx-auto flex items-center justify-between px-44 py-3 font-poppin text-6xl font-bold text-secondary "
      >
        SH
        <div className="flex items-center gap-10 text-lg font-medium text-tert">
          <div onClick={() => push("/")} className="cursor-pointer">
            Home
          </div>
          <div className="cursor-pointer">About Us</div>
          {/* <div className="cursor-pointer">Contact Us</div> */}
          <div>
            {session.status === "unauthenticated" ? (
              <button
                onClick={handleAuth}
                className="rounded-lg border-4 border-secondary bg-secondary px-6 py-2 font-poppin text-lg font-medium text-white"
              >
                Login
              </button>
            ) : (
              <div>
                <button
                  onClick={() => signOut({ redirect: "/" })}
                  className="rounded-lg border-4 border-secondary bg-secondary px-6 py-2 font-poppin text-lg font-medium text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
