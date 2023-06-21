
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
import SoftButton from "components/SoftButton";
import { Link } from 'react-router-dom'
import { IMG_URL } from "config/constant";

// Data
import { useEffect, useState } from "react";
import AuthApi from "api/auth";
import { TbEdit, TbTrash } from "react-icons/tb";



function ViewPassCodeProducts() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    useEffect(() => {
        getDetails();
        Triger();
    }, [])
    const getDetails = async () => {
        const response = await AuthApi.GetMethod('/get-pass-code-products');
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


    const deleteData = async (id) => {

        if (confirm("are you sure to delete?") == true) {
            const dataPost = await AuthApi.Deletemethod(
                "/delete-pass-code-products/" + id
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
                                    <SoftTypography variant="h6">Products</SoftTypography>
                                    <Link to={"/create-pass-code-products"}>
                                        {" "}
                                        <SoftButton
                                            onclickvariant="outlined"
                                            color="primary"
                                            size="small"
                                        >
                                            Add Products
                                        </SoftButton>
                                    </Link>
                                </SoftBox>

                                <SoftBox sx={{ padding: 5, alignItems: "center" }}>
                                    <div className="table-responsive">
                                        <table id="example" className="table table-striped table-bordered " style={{ width: "100%", fontSize: "14px", alignItems: "center" }}>
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Id</th>
                                                    <th className="text-center">Shop Product Name</th>
                                                    <th className="text-center">Name</th>
                                                    <th className="text-center">Image</th>
                                                    <th className="text-center">Payment link (INR)</th>
                                                    <th className="text-center">Payment link (USD)</th>
                                                    <th className="text-center">Price (INR)</th>
                                                    <th className="text-center">Price (USD)</th>
                                                    <th className="text-center">Edit</th>
                                                    <th className="text-center">Delete</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {data.map((result, index) => {
                                                    return (<tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{result.shop_product ? (result.shop_product.shop_categories ? (result.shop_product.product_name +'-('+ result.shop_product.shop_categories.category_name+')') : result.shop_product.product_name):''}</td>
                                                        <td>{result.product_name}</td>
                                                        <td><img src={IMG_URL + result.product_image} width={75} height={75} /></td>
                                                        <td>{result.payment_link_inr}</td>
                                                        <td>{result.payment_link_usd}</td>
                                                        <td>{result.product_price_inr}</td>
                                                        <td>{result.product_price_usd}</td>
                                                        <td>     <Link to={'/update-pass-code-products/' + result.id}>
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
            }</>);
}

export default ViewPassCodeProducts;
