/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function getCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/current`,
          {
            withCredentials: true,
          }
        );
        dispatch(setUserData(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
}

export default getCurrentUser;
