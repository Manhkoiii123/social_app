/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers } from "../redux/userSlice";

function getSuggestedUser() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/suggested`,
          {
            withCredentials: true,
          }
        );
        dispatch(setSuggestedUsers(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
}

export default getSuggestedUser;
