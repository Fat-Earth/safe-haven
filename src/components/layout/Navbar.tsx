import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

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
        callbackUrl: "/user",
      });
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    } catch (e) {
      if (e.message.includes("Connector not found"))
        alert("Cannot find metamask");
    }
  };

  return (
    <div className="fixed top-0 w-full bg-primary ">
      <div className="mx-auto flex items-center justify-between px-44 py-8 font-poppin text-xl font-bold text-secondary">
        Safe Haven
        <div className="flex items-center gap-10 text-lg font-medium text-tert">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">About Us</div>
          <div className="cursor-pointer">Contact Us</div>
          <div>
            <button
              onClick={handleAuth}
              className="rounded-lg border-4 border-secondary bg-secondary px-6 py-2 font-poppin text-lg font-medium text-white"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
