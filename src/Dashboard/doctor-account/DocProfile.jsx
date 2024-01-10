import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { HashLoader } from "react-spinners";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    ticketPrice: "",
    phone: "",
    specialization: "",
    qualifications: [],
    experiences: [],
    bio: "",
    timeSlots: [],
    about: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      ticketPrice: user.ticketPrice,
      phone: user.phone,
      specialization: user.specialization,
      qualifications: {
        startingDate: user.qualifications.startingDate,
        endDate: user.qualifications.endDate,
        degree: user.qualifications.degree,
        university: user.qualifications.university,
      },
      experiences: {
        startingDate: user.experiences.startingDate,
        endDate: user.experiences.endDate,
        position: user.experiences.position,
        hospital: user.experiences.hospital,
        hospital: user.experiences.year,
      },
      bio: user.bio,
      timeSlots: {
        day: user.timeSlots.day,
        startTime: user.timeSlots.startTime,
        endTime: user.timeSlots.endTime,
      },
      about: user.about,
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const nameParts = name.split(".");

    if (nameParts.length === 2) {
      const [parentField, childField] = nameParts;
      setFormData((prevState) => ({
        ...prevState,
        [parentField]: {
          ...prevState[parentField],
          [childField]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
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
      toast.success("update Succesfully");
      navigate("/doctors/profile/me");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" px-3 bg-yellow-100 text-sm whitespace-nowrap ">
        <span className="pr-10 bg-yellow-100 inline-flex items-center">
          <IoIosWarning className="text-black-100" />
          <p className="ml-1">
            To get approval please complete your profile. We'll review manually
            and approve within 3 days.
          </p>
        </span>
      </div>
      <h1 className="py-6">Profile Information</h1>
      <div className="py-6">
        <form onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-bold mb-2"
            >
              Name*
            </label>
            <input
              id="inputField"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              placeholder=""
              style={{ width: "673px" }}
            />
          </div>
          <div>
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-bold mb-2"
            >
              Email*
            </label>
            <input
              id="inputField"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              placeholder=""
              style={{ width: "673px" }}
            />
          </div>
          <div>
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone*
            </label>
            <input
              id="inputField"
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              placeholder=""
              style={{ width: "673px" }}
            />
          </div>
          <div>
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-bold mb-2"
            >
              Bio*
            </label>
            <input
              id="inputField"
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              placeholder=""
              style={{ width: "673px" }}
            />
          </div>
          <div className="flex">
            <div>
              <label
                htmlFor="inputField"
                className="block text-gray-700 font-bold mb-2"
              >
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-1/3 px-3 py-2 mr-2 rounded-md border focus:outline-none focus:border-blue-500"
                style={{ width: "220px" }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="inputField"
                className="block text-gray-700 font-bold mb-2"
              >
                Speciallization*
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-1/3 px-3 py-2 mr-2 rounded-md border focus:outline-none focus:border-blue-500"
                style={{ width: "220px" }}
              >
                <option value="">Select</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="inputField"
                className="block text-gray-700 font-bold mb-2"
              >
                Ticket Price*
              </label>
              <input
                id="inputField"
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "220px" }}
              />
            </div>
          </div>
          <h1 className="py-4 font-bold">Add Latest Qulification </h1>
          <div className="flex py-3">
            <div>
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                Starting Date *
              </label>
              <input
                id="inputField"
                type="date"
                name="qualifications.startingDate"
                value={formData.qualifications.startingDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
            <div className="px-4">
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                End Date*
              </label>
              <input
                id="inputField"
                type="date"
                name="qualifications.endDate"
                value={formData.qualifications.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
          </div>
          <div className="flex py-2">
            <div>
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                Degree*
              </label>
              <input
                id="inputField"
                type="text"
                name="qualifications.degree"
                value={formData.qualifications.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
            <div className="px-4">
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                University*
              </label>
              <input
                id="inputField"
                type="text"
                name="qualifications.university"
                value={formData.qualifications.university}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
          </div>

          <h1 className="py-4 font-bold">Add Latest Experience</h1>

          <div className="flex py-3">
            <div>
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                Starting Date *
              </label>
              <input
                id="inputField"
                type="date"
                name="experiences.startingDate"
                value={formData.experiences.startingDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
            <div className="px-4">
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                End Date*
              </label>
              <input
                id="inputField"
                type="date"
                name="experiences.endDate"
                value={formData.experiences.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
          </div>

          <div className="flex py-2">
            <div>
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                Position*
              </label>
              <input
                id="inputField"
                type="text"
                name="experiences.position"
                value={formData.experiences.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
            <div className="px-4">
              <label htmlFor="inputField" className="block text-gray-700  mb-2">
                Hospital*
              </label>
              <input
                id="inputField"
                type="text"
                name="experiences.hospital"
                value={formData.experiences.hospital}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                placeholder=""
                style={{ width: "330px" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="inputField" className="block text-gray-700 mb-2">
              Number of year*
            </label>
            <input
              id="inputField"
              type="number"
              name="experiences.year"
              value={formData.experiences.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              placeholder=""
              style={{ width: "673px" }}
            />
          </div>

          <div>
            <label
              htmlFor="inputField"
              className="block text-gray-700 font-bold mb-2"
            >
              About*
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Enter text here"
              rows={4}
            />
          </div>

          <div className=" relative w-[130px] py-3 h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg, .png"
              onChange={handleFileInputChange}
              className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] 
                py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
            >
              Upload Photo
            </label>
          </div>
          <div className=" mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              style={{ width: "690px" }}
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
