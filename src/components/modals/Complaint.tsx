/* eslint-disable @typescript-eslint/no-floating-promises */
import { ComplaintType, type Employee } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

type Props = {
  show: boolean;
  onClose: () => void;
  employee: Employee;
};

const complaintZ = z.object({
  walletAddress: z.string(),
  companyId: z.string(),
  description: z.string(),
  e_date: z.string(),
  e_place: z.string(),
  e_time: z.string(),
  employeeId: z.string(),
  type: z.string(),
});

type ComplaintZod = z.infer<typeof complaintZ>;

const Complaint = (props: Props) => {
  const [formInfo, setFormInfo] = useState<ComplaintZod>({} as ComplaintZod);

  const companyEmployeeList = api.employee.getEmployeeList.useQuery(
    {
      companyId: props.employee?.companyId,
    },
    {
      enabled: !!props.employee?.companyId,
    }
  );

  const registerComplaintMutation =
    api.employee.registerComplaint.useMutation();
  const router = useRouter();

  const register = () => {
    registerComplaintMutation.mutate(
      {
        type: formInfo.type,
        description: formInfo.description,
        employeeId: formInfo.employeeId,
        e_date: formInfo.e_date,
        e_time: formInfo.e_time,
        e_place: formInfo.e_place,
        companyId: props.employee.companyId,
        walletAddress: props.employee.walletAddress,
      },
      {
        onSuccess: () => {
          router.reload();
          props.onClose();
        },
      }
    );
  };

  if (!props.show) return null;

  // complaintType ComplaintType
  // description   String
  // employee      Employee        @relation(fields: [employeeId], references: [id])
  // employeeId    String
  // createdAt     DateTime        @default(now())
  // updatedAt     DateTime        @updatedAt
  // e_date        String
  // e_time        String
  // e_place       String

  // if (companyEmployeeList.isLoading) return <div>loading</div>;

  return (
    <div
      onClick={props.onClose}
      className="fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center bg-black/20"
    >
      <form
        className="max-h-[700px] space-y-20 overflow-y-scroll rounded-xl bg-primary p-20"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log({ formInfo });
          register();
        }}
      >
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            1. Enter Your Name
          </h4>
          <input
            name="name"
            className="mt-3 border-b-2 border-tert bg-primary text-3xl font-bold text-tert focus:outline-none"
            onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
            placeholder="enter your name"
          />
        </div>
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            2. Select your type
          </h4>
          <div className="mt-3 space-y-2">
            <div className="font-poppin text-3xl font-bold text-tert">
              <input
                type="radio"
                name="type"
                value={ComplaintType.VICTIM}
                className="mr-5 scale-150"
                onClick={() =>
                  setFormInfo({ ...formInfo, type: ComplaintType.VICTIM })
                }
              />
              {ComplaintType.VICTIM}
            </div>
            <div className="font-poppin text-3xl font-bold text-tert">
              <input
                type="radio"
                name="type"
                value={ComplaintType.WITNESS}
                className="mr-5 scale-150"
                onClick={() =>
                  setFormInfo({ ...formInfo, type: ComplaintType.WITNESS })
                }
              />
              {ComplaintType.WITNESS}
            </div>
          </div>
        </div>
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            3. Select the alleged perpetrator
          </h4>
          <select
            className="mt-3 w-full border-b-2 border-tert bg-primary text-3xl font-bold text-tert focus:outline-none"
            onChange={(e) =>
              setFormInfo({
                ...formInfo,
                employeeId: companyEmployeeList.data?.find(
                  (item) => item.name === e.target.value
                )?.id,
              })
            }
          >
            <option>Select the person</option>
            {companyEmployeeList?.data
              ?.filter((item) => item.id !== props.employee.id)
              .map((company) => (
                <option key={company.id}>{company.name}</option>
              ))}
          </select>
        </div>
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            4. Event Date
          </h4>
          <input
            name="name"
            className="mt-3 border-b-2 border-tert bg-primary text-3xl font-bold text-tert focus:outline-none"
            onChange={(e) =>
              setFormInfo({ ...formInfo, e_date: e.target.value })
            }
            placeholder="enter the date"
            type="date"
          />
        </div>
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            5. Event Time
          </h4>
          <input
            name="name"
            className="mt-3 border-b-2 border-tert bg-primary text-3xl font-bold text-tert focus:outline-none"
            onChange={(e) =>
              setFormInfo({ ...formInfo, e_time: e.target.value })
            }
            placeholder="enter the time"
            type="time"
          />
        </div>
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            6. Event Place
          </h4>
          <input
            name="name"
            className="mt-3 border-b-2 border-tert bg-primary text-3xl font-bold text-tert focus:outline-none"
            onChange={(e) =>
              setFormInfo({ ...formInfo, e_place: e.target.value })
            }
            placeholder="enter the place of event"
          />
        </div>
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            7. Event Description
          </h4>
          <input
            name="name"
            className="mt-3 border-b-2 border-tert bg-primary text-3xl font-bold text-tert focus:outline-none"
            onChange={(e) =>
              setFormInfo({ ...formInfo, description: e.target.value })
            }
            placeholder="enter the description"
          />
        </div>
        <button className="rounded-lg border-4 border-secondary bg-secondary px-6 py-2 font-poppin text-lg font-medium text-white">
          Raise Complaint
        </button>
      </form>
    </div>
  );
};

export default Complaint;
