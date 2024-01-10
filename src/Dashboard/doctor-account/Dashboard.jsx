import { useContext, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { authContext } from "./../../context/AuthContext";

import useGetProfile from "../../hooks/useFetchData.jsx";
import { BASE_URL } from "../../config";
import Loading from "../../componets/Loader/Loading";
import Error from "../../componets/Error/Error";
import startIcon from "../../assets/images/Star.png";
import Appointment from "../doctor-account/Appointments";
import Overview from "../doctor-account/Overview";
import Profile from "../doctor-account/DocProfile";
import AddTimeslots from "./AddTimeslots";

const Dashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("overview");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-20">
          <div className="shadow-xl pb-[50px] px-[30px] rounded-lg bg-white">
            <div className="flex-col items-center justify-center py-3">
              <button
                onClick={() => setTab("overview")}
                className={`${
                  tab === "overview" && "bg-blue-100 text-blue-600"
                } font-semibold w-full py-4   text-[16px] leading-2 rounded-md text-black`}
              >
                Overview
              </button>
              <button
                onClick={() => setTab("appointments")}
                className={`${
                  tab === "appointments" && "bg-blue-100 text-blue-600"
                } font-semibold w-full py-4   text-[16px] leading-2 rounded-md text-black`}
              >
                Appointements
              </button>
              <button
                onClick={() => setTab("timeslots")}
                className={`${
                  tab === "timeslots" && "bg-blue-100 text-blue-600"
                } font-semibold w-full py-4   text-[16px] leading-2 rounded-md text-black`}
              >
                Add TimeSlots
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-blue-100 text-blue-600"
                } font-semibold w-full py-4   text-[16px] leading-2 rounded-md text-black`}
              >
                Profile
              </button>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button
                className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </button>
            </div>
          </div>

          {tab === "overview" && <Overview userData={userData} />}
          {tab === "appointments" && <Appointment user={userData} />}
          {tab === "settings" && <Profile user={userData} />}
          {tab === "timeslots" && <AddTimeslots user={userData} />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
