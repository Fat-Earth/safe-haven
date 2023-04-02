/* eslint-disable @typescript-eslint/no-floating-promises */
import type { Employee } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ComplaintItem from "~/components/ComplaintItem";
import Navbar from "~/components/layout/Navbar";
import Complaint from "~/components/modals/Complaint";
import { api } from "~/utils/api";

const Dashboard = () => {
  const { status, data } = useSession();
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const userInfo = api.employee.getEmployee.useQuery(
    {
      walletAddress: data?.user?.address,
    },
    {
      enabled: !!data?.user?.address,
    }
  );

  const complaints = api.employee.getUserComplaints.useQuery(
    {
      walletAddress: data?.user?.address,
    },
    {
      enabled: !!data?.user?.address,
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  console.log(complaints.data);

  return (
    <>
      <Complaint
        show={showComplaintModal}
        onClose={() => setShowComplaintModal(false)}
        employee={userInfo.data as Employee}
      />
      <div className="bg-primary">
        <Navbar />
        <div className="min-h-screen p-44">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="max-w-[500px]truncate font-poppin text-5xl font-bold text-secondary">
                Hey, {userInfo.data?.name}
              </h2>
              <h4 className="mt-3 font-poppin text-xl text-tert">
                Welcome to Safe Haven
              </h4>
            </div>
            <button
              className="rounded-lg border-4 border-secondary bg-secondary px-6 py-2 font-poppin text-lg font-medium text-white"
              onClick={() => setShowComplaintModal(true)}
            >
              New Complaint
            </button>
          </div>
          <div>
            <h3 className="mt-16 font-poppin text-4xl font-semibold text-secondary underline">
              Previous Complaints
            </h3>

            {!complaints.data?.length && (
              <h4 className="mt-3 font-poppin text-xl text-tert">
                You have no previous complaints
              </h4>
            )}
            <div className="mt-10 space-y-5">
              {complaints.data?.map((complaint) => (
                <ComplaintItem complaint={complaint} key={complaint.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
