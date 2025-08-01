import dp from "../assets/dp.webp";
const StoryDp = ({ profileImage, userName }) => {
  return (
    <div className="flex flex-col w-[80px]">
      <div className="w-[80px] h-[80px] bg-gradient-to-b from-blue-500 to-blue-950 rounded-full flex justify-center items-center">
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileImage ? profileImage : dp}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-[14px] text-center truncate w-full  text-white font-semibold">
        {userName}
      </div>
    </div>
  );
};

export default StoryDp;
