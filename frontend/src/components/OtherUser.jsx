import { useNavigate } from "react-router-dom";
import dp from "../assets/dp.webp";
const OtherUser = ({ user }) => {
  const nav = useNavigate();
  return (
    <div className=" w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800">
      <div className="flex items-center gap-[10px]">
        <div
          onClick={() => nav(`/profile/${user.userName}`)}
          className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
        >
          <img
            src={user.profileImage ? user.profileImage : dp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-[18px] text-white font-semibold">
            {user.userName}
          </div>
          <div className="text-[15px] text-gray-400 font-semibold">
            {user.name}
          </div>
        </div>
      </div>
      <button className="bg-white text-black px-[20px] py-[8px] rounded-full cursor-pointer">
        Follow
      </button>
    </div>
  );
};

export default OtherUser;
