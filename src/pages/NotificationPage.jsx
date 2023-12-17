import { useEffect, useRef, useContext } from "react";
import { authContext } from "./../context/AuthContext.jsx";
import Loading from "../componets/Loader/Loading";
import axios from "axios";
import { BASE_URL, token } from "../config";
import { toast } from "react-toastify";
const NotificationPage = () => {
  const { user, role, token } = useContext(authContext);
  console.log("userrrrrrr", user);
  const handleMarkAllRead = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/users/get-all-notification",
        {
          userId: user._id,
        },  
        {headers: {
            Authorization: `Bearer ${token}`,
          },}
      );

      if (res.data.success) {
        toast.success(res.message);
      } else {
        toast.error(err.message);
      }
    } catch (error) {
      console.log(error);
      toast.success("something went wrong");
    }
  };

  const handleDeleteAllRead = () => {};

  return (
    <>
      <h4 className="p-3 text-center">Notification Page</h4>
      <div className="w-full">
        <ul className="flex justify-end p-2 bg-gray-200">
          <li
            className="cursor-pointer hover:text-blue-500"
            onClick={handleMarkAllRead}
          >
            Mark All Read
          </li>
        </ul>
      </div>
      <div className="w-full">
        <ul className="flex justify-end p-2 bg-gray-200">
          <li
            className="cursor-pointer hover:text-blue-500"
            onClick={handleMarkAllRead}
          >
            Delete All Read
          </li>
        </ul>
      </div>
    </>
  );
};

export default NotificationPage;
