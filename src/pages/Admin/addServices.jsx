import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["SERVICE NAME", "DESCRIPTION", "ACTION", ""];

const addServices = () => {
  const [formData, setFormData] = useState({
    zname: "",
    discription: "",
  });
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/services"
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // const handleAddService = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:4000/admin/services",
  //       {
  //         name: serviceName,
  //         description: description,
  //         isBlocked: false,
  //       }
  //     );
  //     console.log("Service added:", response.data);
  //   } catch (error) {
  //     console.error("Error adding service:", error);
  //   }
  // };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/admin/services", {
        name: formData.name,
        discription: formData.discription,
        isBlocked: false,
      });

      if (res.status === 201) {
        toast.success("Service added successfully");
        // Update services after successful addition
        const updatedServices = await axios.get(
          "http://localhost:4000/admin/services"
        );
        setServices(updatedServices.data);
      } else {
        throw new Error("Unable to add service");
      }
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Error adding service. Please try again.");
    }
  };

  if (!Array.isArray(services) || services.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center ">
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                services list
              </Typography>
              <Typography
                color="gray"
                className="mt-1 font-normal"
              ></Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <div className="w-72">
                <form onSubmit={submitHandler}>
                  <input
                    name="name"
                    placeholder="Service name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="discription"
                    placeholder="Description"
                    value={formData.discription}
                    onChange={handleInputChange}
                    rows={4}
                    cols={50}
                  />

                  <Button
                    type="submit"
                    className="flex items-center gap-3"
                    size="sm"
                  >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                    service
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </thead>
            <tbody>
              {services.map(({ _id, name, discription }, index) => {
                const isLast = index === services.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {discription}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Button variant="outlined" size="sm">
                          EDIT{" "}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default addServices;
