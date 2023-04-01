/* eslint-disable @next/next/no-img-element */
import { Company } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

const MyProfile = () => {
  const companyList = api.employee.getCompanies.useQuery();

  const [userInfo, setUserInfo] = useState<{
    name: string;
    company: Company;
  }>({
    name: "",
    company: {} as Company,
  });

  if (companyList.isLoading) return <div>Loading...</div>;

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
            />
          </div>
          <div>
            <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
              2. Select your company
            </h4>
            <select className="mt-3 w-full border-b-2 border-tert bg-primary text-6xl font-bold text-tert focus:outline-none">
              {companyList?.data?.map((company) => (
                <option
                  key={company.id}
                  onClick={() =>
                    setUserInfo((prev) => ({
                      ...prev,
                      company,
                    }))
                  }
                >
                  {company.name}
                </option>
              ))}
            </select>
            <button className="text-md mt-10 rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-white">
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;