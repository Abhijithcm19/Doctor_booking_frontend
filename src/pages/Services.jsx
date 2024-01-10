import React, { useState, useEffect } from "react";
import { services } from "../assets/data/services";
import ServiceCard from "../componets/Services/ServiceCard";
import { BASE_URL, token } from "../config";
import axios from "axios";

const Services = () => {
  const [serviceNames, setServiceNames] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/services`);
        setServiceNames(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const combinedServices = serviceNames.map((specialization, index) => ({
    specialization,
    ...services[index],
  }));

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] ">
          {combinedServices.map((service, index) => (
            <ServiceCard service={service} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
