import { useContext, useState } from "react";
import { authContext } from "./../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData.jsx";
import { BASE_URL } from "../../config";
import Loading from "../../componets/Loader/Loading";
import Error from "../../componets/Error/Error";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

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
          role: "patient",
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
        {loading && !error && <Loading />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className=" shadow-xl pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    0-
                  </span>
                </p>
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

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" && <MyBookings user={userData} />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
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

export default MyAccount;
