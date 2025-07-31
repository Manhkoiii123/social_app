import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const handleStep1 = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/sendOtp`,
        { email },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setStep(2);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleStep2 = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verifyOtp`,
        { email, otp },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setStep(3);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleStep3 = async () => {
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        alert("Password doesn't match");
        return;
      }
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resetPassword`,
        { email, password: newPassword },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step === 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative flex mt-[30px] items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700  absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.email ? "top-[-15px]" : ""
              }`}
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full h-full p-[20px] rounded-2xl outline-none border-0"
            />
          </div>
          <button
            onClick={handleStep1}
            type="submit"
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? (
              <ClipLoader loading={loading} size={30} color="white" />
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
          <div
            className="relative flex mt-[30px] items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700  absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.otp ? "top-[-15px]" : ""
              }`}
            >
              Enter your otp
            </label>
            <input
              type="text"
              id="otp"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="w-full h-full p-[20px] rounded-2xl outline-none border-0"
            />
          </div>
          <button
            onClick={handleStep2}
            type="submit"
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? (
              <ClipLoader loading={loading} size={30} color="white" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>
          <div
            className="relative flex mt-[30px] items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, newPassword: true })
            }
          >
            <label
              htmlFor="newPassword"
              className={`text-gray-700  absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.newPassword ? "top-[-15px]" : ""
              }`}
            >
              Enter your new password
            </label>
            <input
              type="password"
              id="newPassword"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="w-full h-full p-[20px] rounded-2xl outline-none border-0"
            />
          </div>
          <div
            className="relative flex mt-[30px] items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, confirmPassword: true })
            }
          >
            <label
              htmlFor="confirmPassword"
              className={`text-gray-700  absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClicked.confirmPassword ? "top-[-15px]" : ""
              }`}
            >
              Confirm your new password
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="w-full h-full p-[20px] rounded-2xl outline-none border-0"
            />
          </div>
          <button
            onClick={handleStep3}
            type="submit"
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
          >
            {loading ? (
              <ClipLoader loading={loading} size={30} color="white" />
            ) : (
              "Reset password"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
