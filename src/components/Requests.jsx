import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();


  const reviewRequest = async (status,_id) => {
    try{
        const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{
            withCredentials:true,
        }
        );
        dispatch(removeRequest(_id));
    } catch (err) {
        console.log(err.message)
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return <h1>NO REQUESTS BRO</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName } = request.fromUserId;

        return (
          <div
            key={_id}
            className="m-4 p-4 border rounded-lg bg-base-200 w-2/3 mx-auto flex justify-between items-center"
          >
            <div className="flex">
            <h2 className="mx-2.5">{firstName}</h2>
            <h3>{lastName}</h3>
            </div>
            <div>
              <button className="btn btn-soft btn-primary mx-2" onClick={()=> reviewRequest("accepted",request._id)}>Accept</button>
              <button className="btn btn-soft btn-secondary mx-2" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
