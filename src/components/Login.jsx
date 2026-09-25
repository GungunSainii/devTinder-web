import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux"; 
import { addUser } from "../utils/userSlice"; 
import { useNavigate } from "react-router-dom"; 
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("pookiecookie@gmail.com");
  const [password, setPassword] = useState("Cookie@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
        const res = await axios.post(BASE_URL + "/login",{
            emailId,
            password,
        },{
          withCredentials:true
        })
        console.log(res.data);
        dispatch(addUser(res.data));
        navigate("/");
    } catch(err) {
        console.log(err);
    }
  }

  return (
    <div className="flex justify-center my-4">
      <div className="card card-border bg-base-100 w-96 ">
        <div className="card-body ">
          <h2 className="card-title flex justify-center my-1.5">Login</h2>
          <label className="floating-label my-2">
            <span>Email</span>
            <input
              type="text"
              value={emailId}
              placeholder="mail@gmail.com"
              className="input input-md"
              onChange={(e)=> setEmailId(e.target.value)}
            />
          </label>

          <label className="floating-label my-2">
            <span>Password</span>
            <input
              type="text"
              value={password}
              placeholder="Password"
              className="input input-md"
              onChange={(e)=> setPassword(e.target.value)}
            />
          </label>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
