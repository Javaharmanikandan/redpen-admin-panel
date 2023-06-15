
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Soft UI Dashboard React examples
import SoftButton from "components/SoftButton";
import { IMG_URL } from "config/constant";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from 'react-router-dom';

// Data
import AuthApi from "api/auth";
import { useEffect, useState } from "react";
import { TbTrash } from "react-icons/tb";



function ViewBlogDesImage() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        getDetails();
        Triger();
    }, [])
    const getDetails = async () => {
        const response = await AuthApi.GetMethod('/get-blog-description-image');
        setData(response.data.data);
        setLoad(false);
    }

    const Triger = () => {
        $(document).ready(function () {
            setTimeout(function () {
                $('#example').DataTable();
            }, 1000);
        });


    }
    const copy = async (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('Image URL is Copied');
            })
            .catch((error) => {
                toast.error(error);
            });

    }

    const deleteData = async (id) => {
        if (confirm("are you sure to delete?") == true) {
            const dataPost = await AuthApi.Deletemethod(
                "/delete-blog-description-image/" + id
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
                                    <SoftTypography variant="h6">Blog Description Image</SoftTypography>
                                    <Link to={"/create-blog-description-image"}>
                                        {" "}
                                        <SoftButton
                                            onclickvariant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Add image
                                        </SoftButton>
                                    </Link>
                                </SoftBox>

                                <SoftBox sx={{ padding: 5, alignItems: "center" }}>
                                    <div className="table-responsive">
                                        <table id="example" className="table table-striped table-bordered " style={{ width: "100%", fontSize: "14px", alignItems: "center" }}>
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Id</th>
                                                    <th className="text-center">Image</th>
                                                    <th className="text-center">Image URL</th>
                                                    <th className="text-center">Delete</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {data.map((result, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td><img src={IMG_URL + result.image} width={75} height={75} /></td>
                                                        <td> <p style={{ cursor: "pointer" }} onClick={() => copy(IMG_URL + result.image)}>{IMG_URL + result.image}</p></td>
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
            }</>);
}

export default ViewBlogDesImage;
