import { useSession } from "next-auth/react";

/* eslint-disable @next/next/no-img-element */
const Login = () => {
  const session  = useSession();
  console.log(session);
  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <img
        src="/images/login-banner.png"
        alt="banner"
        className="h-screen w-1/2 object-cover"
      />
    </div>
  );
};

export default Login;
