import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileData, setUserData } from "../redux/userSlice";
import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.webp";
import Nav from "../components/Nav";
const Profile = () => {
  const { userName } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector((state) => state.user);
  const handleGetProfile = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.get(`${apiUrl}/api/user/getProfile/${userName}`, {
        withCredentials: true,
      });
      dispatch(setProfileData(res.data));
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    handleGetProfile();
  }, [userName, dispatch]);
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-ful h-[80px] flex items-center justify-between px-[30px] text-white">
        <div onClick={() => nav(-1)}>
          <MdOutlineKeyboardBackspace className="w-[25px] h-[25px] cursor-pointer" />
        </div>
        <div className="text-[20px]  font-semibold">{profileData.userName}</div>
        <div
          onClick={handleLogout}
          className="font-semibold cursor-pointer text-[20px] text-blue-500"
        >
          Logout
        </div>
      </div>
      <div className="w-full h-[150px] flex items-start justify-center gap-[20px] lg:gap-[50px] pt-[20px] px-[10px]">
        <div className="w-[80px]  h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData.profileImage ? profileData.profileImage : dp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="">
          <div className="font-semibold text-[22px] text-white">
            {profileData.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData.profession || "No Profession"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>

      <div className="w-full h-[100px] text-white flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px]">
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold ">
            {profileData.posts.length}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {/* {profileData?.followers?.slice(0, 3).map((follower) => ( */}
              <div className="w-[40px]  h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData.profileImage ? profileData.profileImage : dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[40px]  h-[40px] absolute left-[9px]  border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData.profileImage ? profileData.profileImage : dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[40px]  h-[40px] absolute left-[18px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData.profileImage ? profileData.profileImage : dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {/* ))} */}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData.followers?.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {/* {profileData?.followers?.slice(0, 3).map((follower) => ( */}
              <div className="w-[40px]  h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData.profileImage ? profileData.profileImage : dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[40px]  h-[40px] absolute left-[9px]  border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData.profileImage ? profileData.profileImage : dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[40px]  h-[40px] absolute left-[18px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData.profileImage ? profileData.profileImage : dp}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {/* ))} */}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData.following?.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>

      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
        {profileData._id === userData._id && (
          <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl">
            Edit Profile
          </button>
        )}
        {profileData._id !== userData._id && (
          <>
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl">
              Follow
            </button>
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl">
              Message
            </button>
          </>
        )}
      </div>
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
          <Nav></Nav>
        </div>
      </div>
    </div>
  );
};

export default Profile;
