import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById, updateDoctor } from "../../services/doctorService";
import { toast } from "react-toastify";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    mobile: "",
    specialization: "",
    age: "",
    sex: "",
    address: "",
    aadhaar: "",
    pan: "",
    certificateUrl: null // When doctor details come from backend, certificateUrl comes but certificateFile
  });

  // Fetch doctor details to pre-fill the form
  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const data = await getDoctorById(id);
      setDoctor(data);
    } catch (err) {
      console.error("Failed to fetch doctor:", err);
    }
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await updateDoctor(id, doctor);
  //     toast.success("Doctor profile updated successfully ");
  //     navigate(`/doctors/${id}`); // Go back to profile page
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //     toast.error("Error updating doctor details ");
  //   }
  // };

  //  Handle multi part file handling 
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();

//   // Loop through all doctor fields except file
//   for (const key in doctor) {
//     if (key !== "certificateFile") {
//       formData.append(key, doctor[key]);
//     }
//   }

//   // Append file only if selected
//   if (doctor.certificateFile) {
//     formData.append("certificate", doctor.certificateFile);
//   }

//   try {
//     await updateDoctor(id, formData);
//     toast.success("Doctor profile updated successfully!");
//     navigate(`/doctors/${id}`);
//   } catch (err) {
//     console.error("Update failed:", err);
//     toast.error("Error updating doctor details");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let response;

    // If file exists → use FormData (multipart)
    if (doctor.certificateFile) {
      const formData = new FormData();

      // Append normal fields
      for (const key in doctor) {
        if (key !== "certificateFile") {
          formData.append(key, doctor[key]);
        }
      }

      // Append file
      formData.append("certificate", doctor.certificateFile);

      response = await updateDoctor(id, formData, true); // <-- multipart flag
    }
    //------------------------------------------------------------------------------
    // No file → send JSON update
    else {
      response = await updateDoctor(id, doctor, false); // <-- json flag
    }

    toast.success("Doctor updated successfully!");
    navigate(`/doctors/${id}`);

  } catch (err) {
    console.error(err);
    toast.error("Update failed.");
  }
};


  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h3 className="text-center text-primary mb-4">Edit Doctor Profile</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={doctor.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={doctor.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={doctor.mobile}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label>Specialization</label>
              <input
                type="text"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={doctor.age}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Gender</label>
                <select
                  name="sex"
                  value={doctor.sex}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <textarea
                name="address"
                value={doctor.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label>Aadhaar</label>
              <input
                type="text"
                name="aadhaar"
                value={doctor.aadhaar}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label>PAN</label>
              <input
                type="text"
                name="pan"
                value={doctor.pan}
                onChange={handleChange}
                className="form-control"
              />
            </div>

          <div className="mb-3">
           <label>Upload Certificate</label>
            <input
                type="file"
                name="certificateFile"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) =>
                              setDoctor({
                                ...doctor,
                                certificateFile: e.target.files[0],
                                certificateUrl: doctor.certificateUrl // don't remove old URL
                              })
                            }
             className="form-control"
           />
                {doctor.certificateUrl && (
                    <small className="text-muted">
                     Current file:{" "}
                     <a href={doctor.certificateUrl} target="_blank" rel="noreferrer">
                      View existing certificate
                      </a>
                </small>
           )}
        </div>


            <button type="submit" className="btn btn-primary w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDoctor;
