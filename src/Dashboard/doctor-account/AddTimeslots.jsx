import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { HashLoader } from "react-spinners";
const AddTimeslots = ({ user }) => {
  const [formData, setFormData] = useState({
    timeSlots: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.timeSlots) {
      setFormData({
        ...formData,
        timeSlots: user.timeSlots.map((slot) => ({ ...slot })),
      });
    }
  }, [user]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index] = {
      ...newTimeSlots[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      timeSlots: newTimeSlots,
    });
  };

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      timeSlots: [
        ...formData.timeSlots,
        { day: "", startTime: "", endTime: "" },
      ],
    });
  };

  const removeTimeSlot = (index) => {
    const newTimeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      timeSlots: newTimeSlots,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success("Updated Successfully");
      navigate("/doctors/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1 className="py-4 font-bold">Add TimeSlot</h1>

        {formData.timeSlots.map((timeSlot, index) => (
          <div key={index} className="flex">
            {/* Day select */}
            <div>
              <label
                htmlFor={`day_${index}`}
                className="block text-gray-700 mb-2"
              >
                Day*
              </label>
              <select
                id={`day_${index}`}
                name={`day`}
                value={timeSlot.day}
                onChange={(e) => handleInputChange(e, index)}
                className="w-1/3 px-3 py-2 mr-2 rounded-md border focus:outline-none focus:border-blue-500"
                style={{ width: "220px" }}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                {/* Add more options */}
              </select>
            </div>
            {/* StartTime input */}
            <div>
              <label
                htmlFor={`startTime_${index}`}
                className="block text-gray-700 mb-2"
              >
                Starting Time*
              </label>
              <input
                id={`startTime_${index}`}
                name={`startTime`}
                type="time"
                value={timeSlot.startTime}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "220px" }}
              />
            </div>
            {/* EndTime input */}
            <div className="px-2">
              <label
                htmlFor={`endTime_${index}`}
                className="block text-gray-700 mb-2"
              >
                Ending Time*
              </label>
              <input
                id={`endTime_${index}`}
                name={`endTime`}
                type="time"
                value={timeSlot.endTime}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "220px" }}
              />
            </div>
            {/* Remove button */}
            <button type="button" onClick={() => removeTimeSlot(index)}>
              <MdDelete />
            </button>
          </div>
        ))}

        {/* Add new slot button */}
        <button type="button" onClick={addTimeSlot}>
          <IoIosAddCircle />
        </button>

        {/* Submit button */}
        <div className="mt-7">
          <button
           disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            style={{ width: "690px" }}
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : " Add Slot"}
           
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTimeslots;
