
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



function ViewShopMainCategory() {
    const [category, setCategory] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        getDetails();
        Triger();
    }, [])
    const getDetails = async () => {
        const response = await AuthApi.GetMethod('/get-shop-category');
        setCategory(response.data.data);
        setLoad(false);
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
                "/delete-shop-category/" + id
            );

            if (dataPost.data.status) {
                toast.success(dataPost.data.message);
            } else {
                toast.error(dataPost.data.message);
            }
        }
         getDetails();
    }
    return (
                        <>
            {load ?
                <div className="loader-container">
                    <img style={{ width: 100, height: 100 }} src="https://cdn.dribbble.com/users/255512/screenshots/2235810/sa.gif"></img>
                </div> :
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
                            <SoftTypography variant="h6">Shop category</SoftTypography>
                            <Link to={"/create-shop-category"}>
                                {" "}
                                <SoftButton
                                    onclickvariant="outlined"
                                    color="primary"
                                    size="small"
                                >
                                    Add shop category
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
                                            <th className="text-center">Category level</th>
                                            <th className="text-center">Text color</th>
                                            <th className="text-center">Background Color</th>
                                            <th className="text-center">Edit</th>
                                            <th className="text-center">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {category.map((result, index) => {
                                            return (<tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{result.category_name}</td>
                                                <td>{result.category_level}</td>
                                                <td>{result.chip_text_colors && result.chip_text_colors.color_name}</td>
                                                <td>{result.chip_background_colors && result.chip_background_colors.color_name}</td>
                                                <td>     <Link to={'/update-shop-category/' + result.id}>
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
            }</> );
}

export default ViewShopMainCategory;
