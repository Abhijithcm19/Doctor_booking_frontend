import React, { useState, useEffect } from "react";
import DoctorCard from "../../componets/Doctors/DoctorCard";
import axios from "axios";
import { BASE_URL, token } from "../../config";

const Doctors = () => {
  const [doctorData, setDoctorData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/doctors`);
        setDoctorData(response.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filteredDoctors = doctorData.filter((doctor) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        doctor.name?.toLowerCase().includes(lowerCaseQuery) ||
        doctor.specialization?.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setSearchResults(filteredDoctors);
  }, [searchQuery, doctorData]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = searchResults.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when performing a new search
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor"
              onChange={handleSearch}
              value={searchQuery}
            />
            <button className="btn mt-0 rounded-[0px] rounded-f-md">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {currentDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
          <ul className="pagination">
            {searchResults.length > doctorsPerPage &&
              Array(Math.ceil(searchResults.length / doctorsPerPage))
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Doctors;
