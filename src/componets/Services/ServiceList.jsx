import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { services } from "../../assets/data/services";
import { BASE_URL, token } from "../../config";
import axios from "axios";

const ServiceList = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {combinedServices.map((service, index) => (
        <ServiceCard service={service} index={index} key={index} />
      ))}
    </div>
  );
};

export default ServiceList;
