import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors", {
          headers: {
            authorization: `bearer ${localStorage.getItem(
              "doctorAccessToken"
            )}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const closeModal = () => {
    setDeletingDoctor(null);
  };
  const handleDeleteDoctor = (doctor) => {
    fetch(`http://localhost:5000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("doctorAccessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          refetch();
          toast.success("Doctor deleted successfully");
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1>Manage Doctors {doctors?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </th>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingDoctor.name}. It can not be undone`}
          successAction={handleDeleteDoctor}
          closeModal={closeModal}
          modalData={deletingDoctor}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
