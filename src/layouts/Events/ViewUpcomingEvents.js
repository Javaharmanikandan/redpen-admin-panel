
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftButton from "components/SoftButton";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from 'react-router-dom'
import { IMG_URL } from "config/constant";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { useEffect, useState } from "react";
import AuthApi from "api/auth";
import SoftAvatar from "components/SoftAvatar";
import { API_SERVER } from "config/constant";
import axios from "axios";
import { TbEdit, TbTrash } from "react-icons/tb";



function ViewUpcomingEvents() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false)
    useEffect(() => {
        getDetails();
        Triger();
    }, [data])
    const getDetails = async () => {
        const response = await AuthApi.GetMethod('/get-upcoming-events');
        setData(response.data.data);
    }

    const Triger = () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#example').DataTable();
            }, 1000);
        });


    }


    const deleteData = async (id) => {
        if (confirm("are you sure to delete?") == true) {
            const dataPost = await AuthApi.Deletemethod(
                "/delete-upcoming-events/" + id
            );
            if (dataPost.data.status) {
                toast.success(dataPost.data.message);
            } else {
                toast.error(dataPost.data.message);
            }
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                        >
                            <SoftTypography variant="h6">Upcoming Events</SoftTypography>
                            <Link to={"/create-upcoming-events"}>
                                {" "}
                                <SoftButton
                                    onclickvariant="outlined"
                                    color="primary"
                                    size="small"
                                >
                                    Add upcoming events
                                </SoftButton>
                            </Link>
                        </SoftBox>

                        <SoftBox sx={{ padding: 5, alignItems: "center" }}>
                            <div className="table-responsive">
                                <table id="example" className="table table-striped table-bordered " style={{ width: "100%", fontSize: "14px", alignItems: "center" }}>
                                    <thead>
                                        <tr>
                                            <th className="text-center">Id</th>
                                            <th className="text-center">Category name</th>
                                            <th className="text-center">Title</th>
                                            <th className="text-center">Event URL</th>
                                            <th className="text-center">Date</th>
                                            <th className="text-center">Time</th>
                                            <th className="text-center">Sub title(H2)</th>
                                            <th className="text-center">Thumbnail image</th>
                                            <th className="text-center">Location</th>
                                            <th className="text-center">Mobile banner</th>
                                            <th className="text-center">Desktop banner</th>
                                            <th className="text-center">Edit</th>
                                            <th className="text-center">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data.map((result, index) => {
                                            return (<tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{result.event_categories ? result.event_categories.sub_category_name : ""}</td>
                                                <td>{result.event_title}</td>
                                                <td>{result.event_url}</td>
                                                <td>{result.event_date}</td>
                                                <td>{result.event_time}</td>
                                                <td>{result.event_sub_title}</td>
                                                <td><img src={IMG_URL + result.event_thumbnail_image} width={75} height={75} /></td>
                                                <td>{result.event_location}</td>
                                                <td><img src={IMG_URL + result.mobile_banner} width={75} height={75} /></td>
                                                <td><img src={IMG_URL + result.desktop_banner} width={75} height={75} /></td>
                                                <td>     <Link to={'/update-upcoming-events/' + result.id}>
                                                    <TbEdit size={20} color={"blue"} />
                                                </Link></td>
                                                <td><TbTrash size={20} color={"red"} onClick={() => { deleteData(result.id) }} /></td>
                                            </tr>)
                                        })}

                                    </tbody>
                                </table>
                                <ToastContainer />
                            </div>
                        </SoftBox>
                    </Card>
                </SoftBox>
            </SoftBox>


            <Footer />
        </DashboardLayout>
    );
}

export default ViewUpcomingEvents;
