import logo from "../assets/logo.png";
import dp from "../assets/dp.webp";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import OtherUser from "./OtherUser";
const LeftHome = () => {
  const { userData, suggestedUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/auth/signOut`, { withCredentials: true });
      dispatch(setUserData(null));
      nav("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[25%]  hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900 relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex justify-between items-center p-[20px]">
        <img src={logo} alt="" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="flex items-center justify-between w-full  gap-[10px] px-[20px] border-b-2 border-gray-900 py-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={userData.profileImage ? userData.profileImage : dp}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[15px] text-gray-400 font-semibold">
              {userData.name}
            </div>
          </div>
        </div>
        <div
          onClick={handleLogout}
          className="text-blue-500 font-normal cursor-pointer"
        >
          Logout
        </div>
      </div>
      <div className="flex w-full flex-col gap-[20px] p-[20px]">
        <h1 className="text-white text-[19px]">Suggestions</h1>
        {suggestedUsers.map((user) => (
          <OtherUser key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default LeftHome;
