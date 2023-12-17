import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../componets/Loader/Loading";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import moment from "moment";
import { HashLoader } from "react-spinners";




const SidePanel = ({ doctorDetails }) => {
  const navigate = useNavigate();

  const { user, role } = useContext(authContext);
  const [selectedDate, setSelectedDate] = useState();
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isSlotAvailable, setIsSlotAvailable] = useState(false); // New state to track slot availability
  const [loadingCheckAvailability, setLoadingCheckAvailability] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  if (!doctorDetails) {
    return <Loading />;
  }
  const { _id, ticketPrice, timeSlots, photo, name } = doctorDetails;
  const razokey = "rzp_test_M9VQH9IQRRuHNb";
  const currency = "INR";
  const receiptId = "qwsaq1";

const paymentHandler = async (e) => {
  setLoadingPayment(true);

  if (!selectedDate || !startTime) {
    toast.error("Please select both date and start time.");
    setLoadingPayment(false);
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/payments`, {
      method: "POST",
      body: JSON.stringify({
        amount: ticketPrice,
        currency,
        receipt: receiptId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const order = await response.json();
    console.log(order);

    var options = {
      key: razokey,
      amount: ticketPrice,
      name: name,
      description: "Test Transaction",
      image: photo,
      order_id: order.id,
      handler: async function (response) {
        const body = {
          user: user._id,
          doctor: _id,
          amount: ticketPrice,
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
          ...response,
        };
        console.log("bodyyyyyyyyyyyy", body, startTime);
        try {
          const validateRes = await fetch(
            "http://localhost:4000/users/paymentverification",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (validateRes.ok) {
            toast.success("Payment Success");
            navigate("/users/profile/me");
          }

          if (!validateRes.ok) {
            throw new Error(`HTTP error! Status: ${validateRes.status}`);
          }

          const jsonRes = await validateRes.json();
          console.log(jsonRes);
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      },
      prefill: {
        name: "medcare",
        email: "medcare@example.com",
        contact: "90000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
    });
    rzp1.open();
    e.preventDefault();
  } catch (error) {
    console.error("Error processing payment:", error);
    setLoadingPayment(false);
  }
};


  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  const handleStartTimeChange = (time) => {
    setStartTime(time);
  
    if (time) {
      const momentStartTime = moment(time, "HH:mm");
      const momentEndTime = momentStartTime.clone().add(30, "minutes");
      const formattedEndTime = momentEndTime.format("HH:mm");
  
      // Now 'formattedEndTime' contains the end time, you can set it in state or use it as needed
      setEndTime(formattedEndTime);
    }
  };
  

  const handleCheckAvailability = async () => {
    setLoadingCheckAvailability(true);
    try {
      if (!selectedDate || !startTime) {
        toast.error("Please select both date and start time.");
        return;
      }
  
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      const response = await axios.post(
        `http://localhost:4000/users/available-slots`,
        {
          doctorId: doctorDetails._id,
          startTime: startTime,
          date: formattedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.message === "Available slots found") {
        setIsSlotAvailable(true);
        toast.success("Slots available");
      } else {
        setIsSlotAvailable(false);
        toast.error("No available slots");
      }
  
      console.log("isSlotAvailable:", isSlotAvailable); // Log the value
    } catch (error) {
      console.error("Error checking availability:", error);
      toast.error("Error checking availability");
    }finally {
      setLoadingCheckAvailability(false);
    }
  };
  
  return (
    <div className="p">
      <div className="shadow-panelShadow p-4 rounded-md text-center">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[14px] leading-6 lg:text-[18px] lg:leading-7 text-headingColor font-bold">
          {ticketPrice} INR
        </span>

        <div className="mt-4">
          <p className="text-para mt-2 font-semibold text-headingColor">
            Available Time Slots:
          </p>
          <div className="mx-auto w-56">
            {timeSlots.map((slot, index) => (
              <p key={index} className="mb-2">
                {slot.day} - {slot.startTime} to {slot.endTime}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-para mt-2 font-semibold text-headingColor">
            Select Appointment Date:
          </p>

          <div className="mx-auto w-56">
            <DatePicker
              className="border p-2 rounded-md w-full"
              format="DD-MM-YYYY"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-para mt-2 font-semibold text-headingColor">
            Select Appointment Start Time:
          </p>
          <div className="mx-auto w-56">
            <TimePicker
              className="border p-2 rounded-md w-full"
              format="HH:mm"
              onChange={handleStartTimeChange}
              value={startTime}
            />
          </div>
        </div>
        <button
        className="btn mt-4 px-4 rounded-md bg-gray-500 text-white hover:bg-orange-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={handleCheckAvailability}
        disabled={loadingCheckAvailability} // Disable the button when loading
      >
        {loadingCheckAvailability ? (
          <HashLoader color="#fff" loading={true} size={20} /> // Show loading indicator
        ) : (
          'Check Availability'
        )}
      </button>
        {isSlotAvailable && ( // Conditionally render based on slot availability
        <button
        className="btn mt-4 px-4 rounded-md"
        onClick={paymentHandler}
        disabled={loadingPayment} // Disable the button when loading
      >
        {loadingPayment ? (
          <HashLoader color="#fff" loading={true} size={20} /> // Show loading indicator
        ) : (
          'Book Appointment'
        )}
      </button>
        )}
      </div>
    </div>
  );
};

export default SidePanel;
