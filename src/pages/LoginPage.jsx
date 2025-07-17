import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronDown } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function LoginPage(props) {
  const [countryCode, setCountryCode] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dBtn, setDBtn] = useState(false);
  const detailsRef = useRef(null);

  const userSchema = z.object({
    // otp: z.string().length(4, "otp must be at least 4 numbers").regex(/^\d+$/),
    phoneNumber: z
      .string()
      .length(10, "Phone number must be at least 10 digits")
      .regex(/^\d+$/),
  });
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (login == "true") {
      navigate("/dashboard");
    }
    const featchData = async () => {
      const URL =
        "https://restcountries.com/v3.1/all?fields=name,idd,flags,cca2";
      try {
        const data = await axios.get(URL);
        console.log(data.data[0]);
        setSelectedCountry(data.data[0]);
        setCountryCode(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    featchData();
  }, []);
  const handleClick = (item) => {
    setSelectedCountry(item);
    if (detailsRef.current) {
      detailsRef.current.open = false; // Close the dropdown
    }
  };
  const handleSend = async () => {
    const isValid = await trigger("phoneNumber");
    if (!isValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setDBtn(true);
    toast.success("Otp is 4356");
  };
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // allow only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default backspace behavior

      const newOtp = [...otp];

      if (otp[index]) {
        // If current input has a value, just clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If current is empty, move back and clear previous
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };
  let navigate = useNavigate();
  const onsubmit = (data) => {
    const otpString = otp.join("");

    if (otpString !== "4356") {
      toast.error("Invalid OTP");
      return;
    }
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    localStorage.setItem("login", "true");

    toast.success("Login successful!");
  };
  console.log(otp);

  return (
    <>
      {isLoading ? (
        <div className="min-h-svh flex justify-center items-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <div className="min-h-svh bg-base-100">
          <Navbar />
          <div className=" mx-7 my-3 p-2 rounded-xl  h-full mt-9 bg-base-200 sm:mx-16 lg:mx-48">
            <div className=" card  ">
              <h2 className="card-title m-2">Sign in to Gemini</h2>
              <div className="card-body h-96">
                <form className="h-full" onSubmit={handleSubmit(onsubmit)}>
                  <label className="label">
                    <span>Mobile No:</span>
                  </label>
                  <div className=" input input-group bg-base-100 bordered rounded-xl flex items-center w-full max-w-xs pl-3">
                    <details
                      ref={detailsRef}
                      className="dropdown dropdown-bottom dropdown-center relative m-0 p-0 "
                    >
                      {selectedCountry && selectedCountry && (
                        <summary
                          tabIndex={0}
                          role="button"
                          className=" flex flex-row items-center justify-center  w-12 ml-1"
                        >
                          <img
                            src={selectedCountry?.flags?.svg}
                            alt=""
                            className="size-6 m-0 p-0 rounded-full"
                          />
                          <ChevronDown />
                          <p className="ml-1">
                            {selectedCountry.idd.root}
                            {selectedCountry.idd.suffixes[0]}
                          </p>
                        </summary>
                      )}

                      <ul
                        tabIndex={0}
                        className="absolute mt-5 w-48 p-2 left-1/2 transform -translate-x-1/2 dropdown-content menu bg-base-100  z-1  h-48  py-2 flex flex-row  shadow-sm overflow-y-scroll overflow-x-hidden  pl-3 rounded-xl ml-14  "
                      >
                        {countryCode &&
                          countryCode.map((item, key) => (
                            <li
                              key={key}
                              className="  mb-1 mr-2 h-8 flex flex-row items-center  w-48"
                              onClick={() => {
                                handleClick(item);
                              }}
                            >
                              <img
                                src={item?.flags?.svg}
                                alt=""
                                className="size-6 m-0 p-0 "
                              />
                              <a className="p-0 pl-2">{item.cca2}</a>

                              <p>
                                ({item.idd.root}
                                {item.idd.suffixes[0]})
                              </p>
                            </li>
                          ))}
                      </ul>
                    </details>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      disabled={dBtn}
                      {...register("phoneNumber")}
                      className=" w-full bg-transparent border-none focus:outline-none ml-4"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 validator-hint">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                  <div className="card-actions justify-end mt-3 h-4">
                    <button
                      type="button"
                      className="btn btn-secondary h-4"
                      onClick={handleSend}
                      disabled={dBtn}
                    >
                      Send
                    </button>
                  </div>
                  {dBtn && (
                    <>
                      <div className="flex justify-center mt-12 mr-1 gap-3  sm:gap-4">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            type="tel"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-9 sm:w-12 h-9 text-center border  rounded-md text-xl"
                          />
                        ))}
                      </div>

                      <div className="card-actions justify-end mt-8 h-4">
                        <button type="submit" className="btn btn-primary h-4">
                          Verify
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
