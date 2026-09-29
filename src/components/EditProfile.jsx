import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
      },3000);
      
    } catch (err) {
      console.log(err.data);
      setError(err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10 ">
        <div>
          <div className="flex justify-center mx-10">
            <div className="card card-border bg-base-100 w-96 ">
              <div className="card-body ">
                <h2 className="card-title flex justify-center my-1.5">Edit</h2>
                <label className="floating-label my-2">
                  <span>First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-md"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="floating-label my-2">
                  <span>Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-md"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <p className="text-red-400">{error}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName }} />
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Save successfully.</span>
        </div>
      </div>}
    </>
  );
};
export default EditProfile;
