import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store)=> store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async ()=>{
        try {
            const res = await axios.get(BASE_URL + "/user/connections",{
                withCredentials:true,
            })
            console.log(res.data.data)
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections) return;

    if(connections.length === 0) {
        return <h1>NO CONNECTIONS BRO</h1>
    }

    return <div className="text-center my-10">
        <h1 className="text-bold text-2xl">Connections</h1>
        {connections.map((connection)=> {

            const {firstName,lastName} = connection

            return (<div className="m-4 p-4 border rounded-lg bg-base-200 w-1/2 mx-auto "> 
                <h2>{firstName}</h2>
                <h3>{lastName}</h3>

            </div>)
        })}
        
    </div>
}

export default Connections;