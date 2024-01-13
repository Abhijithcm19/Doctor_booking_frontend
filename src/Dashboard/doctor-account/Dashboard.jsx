import { useContext, useState, useEffect } from "react";
import { authContext } from "./../../context/AuthContext";
import useGetProfile from "../../hooks/useFetchData.jsx";
import { BASE_URL } from "../../config";
import Loading from "../../componets/Loader/Loading";
import Error from "../../componets/Error/Error";
import Appointment from "../doctor-account/Appointments";
import Overview from "../doctor-account/Overview";
import Profile from "../doctor-account/DocProfile";
import AddTimeslots from "./AddTimeslots";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Dashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/delete-account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password,
          role: "doctor",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        handleLogout();
      } else {
        toast.error(data.message);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error during account deletion:", error);
      toast.error("An error occurred during account deletion");
    }
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
              <button
                className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white"
                onClick={() => setIsModalOpen(true)}
              >
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Delete Account Modal"
        className="Modal"
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            position: "relative",
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fff",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Please enter your password to confirm account deletion:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />
          <div className="button-container">
            <button
              onClick={handleDeleteAccount}
              disabled={modalLoading}
              className="confirm-button"
            >
              {modalLoading ? (
                <HashLoader size={20} color="#fff" />
              ) : (
                "Confirm Deletion"
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Dashboard;
