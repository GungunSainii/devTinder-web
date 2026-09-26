import NavBar from "../components/NavBar";
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {addUser} from "../utils/userSlice";
import { useEffect } from "react";



const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store)=> store.user);

    const fetchUser = async () => {
        if (userData) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view",{
                withCredentials:true,
            });
            dispatch(addUser(res.data));
        } catch (err) {
            if(err.status === 401) {
                navigate("/login");
            }
            //For other errors we can redirect to error page or smthg
            console.log(err);
        }
    }

    useEffect(()=>{
            fetchUser();
    },[]);

    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    )
};

export default Body;