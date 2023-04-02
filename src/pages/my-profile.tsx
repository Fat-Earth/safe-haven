/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const MyProfile = () => {
  const companyList = api.employee.getCompanies.useQuery();
  const { data, status } = useSession();

  const router = useRouter();

  const userInformation = api.employee.getEmployee.useQuery(
    {
      walletAddress: data?.user?.address,
    },
    {
      enabled: !!data?.user?.address,
    }
  );

  useEffect(() => {
    if (userInformation.data) {
      router.push("/dashboard");
    }
  }, [userInformation.data, router]);

  const [userInfo, setUserInfo] = useState<{
    name: string;
    companyId: string;
  }>({
    name: "",
    companyId: "",
  });

  const mutateCreateUser = api.employee.details.useMutation();

  console.log(data);

  const handleCreateUser = (e) => {
    e.preventDefault();

    mutateCreateUser.mutate(
      {
        companyId: userInfo.companyId,
        name: userInfo.name,
        walletAddress: data?.user?.address,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
      }
    );
  };

  if (status === "loading" || companyList.isLoading)
    return <div>Loading...</div>;

  if (status === "unauthenticated") return router.push("/");

  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <img
        src="/images/login-banner.png"
        alt="banner"
        className="h-screen w-1/2 object-cover shadow-2xl"
      />
      <form className="flex flex-col justify-center px-20">
        <h2 className="font-poppin text-6xl font-bold text-secondary">
          My Profile
        </h2>
        <h4 className="mt-2 max-w-[600px] font-poppin text-xl text-tert">
          Complete your profile to continue.
        </h4>
        <div className="mt-20 space-y-20">
          <div>
            <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
              1. Enter Your Name
            </h4>
            <input
              name="name"
              className="mt-3 border-b-2 border-tert bg-primary text-6xl font-bold text-tert focus:outline-none"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              placeholder="enter your name"
            />
          </div>
          <div>
            <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
              2. Select your company
            </h4>
            <select
              className="mt-3 w-full border-b-2 border-tert bg-primary text-6xl font-bold text-tert focus:outline-none"
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  companyId:
                    companyList.data?.find(
                      (item) => item.name === e.target.value
                    )?.id ?? "",
                }))
              }
            >
              <option>Select Company</option>
              {companyList?.data?.map((company) => (
                <option
                  key={company.id}
                  onClick={() =>
                    setUserInfo((prev) => ({
                      ...prev,
                      companyId: company.id,
                    }))
                  }
                >
                  {company.name}
                </option>
              ))}
            </select>
            <button
              className="text-md mt-10 rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-white"
              onClick={handleCreateUser}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
