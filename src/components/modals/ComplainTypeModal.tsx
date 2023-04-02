/* eslint-disable @typescript-eslint/no-floating-promises */
import { ComplaintStatus, type Complaint } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

type Props = {
  show: boolean;
  onClose: () => void;
  complaint: Complaint;
};

const ComplaintTypeModal = (props: Props) => {
  const updateComplaintMutation = api.employee.updateComplaint.useMutation();
  const { reload } = useRouter();

  if (!props.show) return null;

  const handleUpdate = (status: ComplaintStatus) => {
    updateComplaintMutation.mutate(
      {
        id: props.complaint.id,
        status,
      },
      {
        onSuccess: () => {
          reload();
          props.onClose();
        },
      }
    );
  };

  return (
    <div
      onClick={props.onClose}
      className="fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center bg-black/20"
    >
      <form
        className="space-y-20 rounded-xl bg-primary p-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <h4 className="mt-2 max-w-[600px] font-poppin text-2xl font-medium text-tert">
            Update Status
          </h4>
          <div className="mt-5 space-x-3">
            <button
              className="text-md rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-primary"
              disabled={props.complaint.status === ComplaintStatus.PENDING}
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(ComplaintStatus.PENDING);
              }}
            >
              {ComplaintStatus.PENDING}
            </button>
            <button
              className="text-md rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-primary"
              disabled={props.complaint.status === ComplaintStatus.REJECTED}
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(ComplaintStatus.REJECTED);
              }}
            >
              {ComplaintStatus.REJECTED}
            </button>
            <button
              className="text-md rounded-lg border-4 border-secondary bg-secondary px-6 py-3 font-poppin font-bold text-primary"
              disabled={props.complaint.status === ComplaintStatus.RESOLVED}
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(ComplaintStatus.RESOLVED);
              }}
            >
              {ComplaintStatus.RESOLVED}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComplaintTypeModal;
