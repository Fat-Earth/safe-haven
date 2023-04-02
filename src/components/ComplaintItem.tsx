import type { Complaint } from "@prisma/client";

type Props = {
  complaint: Complaint;
};

const ComplaintItem = ({ complaint }: Props) => {
  return (
    <div className="w-full rounded-xl bg-secondary p-10 shadow-xl">
      <div className="flex justify-between">
        <span className="text-pri font-poppin text-xl font-bold text-primary">
          #{complaint.id}
        </span>
        <div className="text-pri font-poppin text-xl font-bold text-primary">
          {complaint.status}
        </div>
      </div>
      <div className="mt-4 flex justify-between font-poppin text-lg text-primary/80">
        <span>
          <b>Complaint Type:</b> {complaint.complaintType}
        </span>
        <span>
          <b>Location:</b> {complaint.e_place}
        </span>
        <span>
          <b>Date:</b>{" "}
          {new Date(complaint.e_date).toLocaleDateString("us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span>
          <b>Time:</b> {complaint.e_time}
        </span>
      </div>
      <div className="mt-3 font-poppin text-lg text-primary/80">
        <b>Description: </b>
        {complaint.description}
      </div>
    </div>
  );
};

export default ComplaintItem;
