
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



function ViewBlog() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false)
    useEffect(() => {
        getDetails();
        Triger();
    }, [data])
    const getDetails = async () => {
        const response = await AuthApi.GetMethod('/get-blog');
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
                "/delete-blog/" + id
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
                            <SoftTypography variant="h6">Blogs</SoftTypography>
                            <Link to={"/create-blog"}>
                                {" "}
                                <SoftButton
                                    onclickvariant="outlined"
                                    color="primary"
                                    size="small"
                                >
                                    Add blog
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
                                            <th className="text-center">Image</th>
                                            <th className="text-center">Post type</th>
                                            <th className="text-center">Post by</th>
                                            <th className="text-center">Blog URL</th>
                                            <th className="text-center">Edit</th>
                                            <th className="text-center">Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data.map((result, index) => {
                                            return (<tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{result.categories ? result.categories.category_name:""}</td>
                                                <td>{result.blog_title}</td>
                                                <td><img src={IMG_URL + result.blog_image} width={75} height={75} /></td>
                                                <td>{result.post_by}</td>
                                                <td>{result.post_type}</td>
                                                <td>{result.blog_url}</td>
                                                <td>     <Link to={'/update-blog/' + result.id}>
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

export default ViewBlog;
