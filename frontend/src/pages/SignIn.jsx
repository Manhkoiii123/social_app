import { useState } from "react";
import logo2 from "../assets/logo2.png";
import logo from "../assets/logo.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const nav = useNavigate();
  const [inputClicked, setInputClicked] = useState({
    userName: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(
        `${apiUrl}/api/auth/signin`,
        {
          userName,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#969696] ">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px] justify-center">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
            <span>Sign in to</span>
            <img src={logo2} alt="" className="w-[70px]" />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-gray-700  absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.userName ? "top-[-15px]" : ""
              }`}
            >
              Enter your username
            </label>
            <input
              type="text"
              id="userName"
              required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              className="w-full h-full p-[20px] rounded-2xl outline-none border-0"
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700  absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.password ? "top-[-15px]" : ""
              }`}
            >
              Enter your password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full h-full p-[20px] rounded-2xl outline-none border-0"
            />
            {showPassword ? (
              <IoIosEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[20px] w-[25px] h-[25px] cursor-pointer"
              />
            ) : (
              <IoIosEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[20px] w-[25px] h-[25px] cursor-pointer"
              />
            )}
          </div>
          <p>
            <span
              onClick={() => nav("/forgot-password")}
              className="cursor-pointer"
            >
              Forgot password?
            </span>
          </p>
          <button
            type="submit"
            disabled={loading}
            onClick={handleSignIn}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? (
              <ClipLoader loading={loading} size={30} color="white" />
            ) : (
              "Sign In"
            )}
          </button>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => nav("/signup")}
              className="border-b-2 border-b-black pb-[3px] text-black cursor-pointer"
            >
              SignUp
            </span>
          </p>
        </div>
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img src={logo} alt="" className="w-[40%]" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
