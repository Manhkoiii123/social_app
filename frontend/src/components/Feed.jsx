import logo from "../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
const Feed = () => {
  return (
    <div className="lg:w-[50%] w-full min-h-[100vh] bg-black lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo} alt="" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="flex w-full overflow-auto gap-[10px] items-center p-[20px]">
        <StoryDp userName={"manh"} />
      </div>
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav></Nav>
      </div>
    </div>
  );
};

export default Feed;
