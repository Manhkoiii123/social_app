import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import dp from "../assets/dp.webp";
const Nav = () => {
  return (
    <div className="w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
      <div>
        <GoHomeFill className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiSearch className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiPlusSquare className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <RxVideo className="text-white w-[25px] h-[25px]" />
      </div>
      <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
        <img src={dp} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Nav;
