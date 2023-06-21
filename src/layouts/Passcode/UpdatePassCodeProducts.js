// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftButton from "components/SoftButton";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
// Data
import Grid from "@mui/material/Grid";
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AuthApi from "api/auth";
import { useParams } from "react-router-dom";
import Select from 'react-select';

function UpdatePassCodeProducts() {
    const { id } = useParams();
    const [load, setLoad] = useState(false);
    const [productName, setProductName] = useState([]);


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getDetails();
        getProductName();
    }, []);


    const getProductName = async () => {

        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-protect-products-name"
        );
        setProductName(dataGet.data.data);
        setLoad(false);
    };
    const getDetails = async () => {
        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-pass-code-products/" + id,
        );
        
        
        setValue("product_name", dataGet.data.data.product_name);
        setValue("product_price_inr", dataGet.data.data.product_price_inr);
        setValue("product_price_usd", dataGet.data.data.product_price_usd);
        setValue("payment_link_inr", dataGet.data.data.payment_link_inr);
        setValue("payment_link_usd", dataGet.data.data.payment_link_usd);
        setTimeout(() => {
            setValue("shop_product_id", dataGet.data.data.shop_product_id);
        }, 1000);
        setLoad(false);
    };



    //To Insert All Data

    const onSubmit = async (data) => {
        setLoad(true);
        let formData = new FormData(); //formdata object
        formData.append("product_image", data.product_image[0]);
        formData.append("shop_product_id", data.shop_product_id);
        formData.append("product_name", data.product_name);
        formData.append("payment_link_inr", data.payment_link_inr);
        formData.append("payment_link_usd", data.payment_link_usd);
        formData.append("product_price_inr", data.product_price_inr);
        formData.append("product_price_usd", data.product_price_usd);
        const dataPost = await AuthApi.PostmethodWithFile(
            "/update-pass-code-products/" + id,
            formData
        );
        if (dataPost.data.status) {
            toast.success(dataPost.data.message);
        } else {
            toast.error(dataPost.data.message);
        }
        setLoad(false);
    };





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
                                    <SoftTypography variant="h6">
                                        Update SHop Code Product
                                    </SoftTypography>
                                </SoftBox>
                                <form
                                    key={3}
                                    style={{ padding: "20px" }}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Shop Products<span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>

                                                <select
                                                    className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                                    name="shop_product_id"

                                                    {...register("shop_product_id", { onChange: (e) => { onChangeHandler(e) }, required: true })}
                                                >
                                                    <option value="" selected>
                                                        Select Product
                                                    </option>
                                                    {productName &&
                                                        productName.map((result, index) => {
                                                            return (
                                                                <option value={result.id}>
                                                                    {result.product_name}-({result.shop_categories ? result.shop_categories.category_name : ''})
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                                {errors.shop_product_id && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Product Title <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("product_name", { required: true })}
                                                    type="text"
                                                    name="product_name"
                                                    placeholder="Product Title or Name "
                                                />
                                                {errors.product_name && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Product Image <span className="Errorspan"></span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("product_image")}
                                                    type="file"
                                                    name="product_image"
                                                    placeholder="ProductImage"
                                                />
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Payment link (INR)<span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("payment_link_inr", { required: true })}
                                                    type="text"
                                                    name="payment_link_inr"
                                                    placeholder="Payment link (INR)"
                                                />
                                                {errors.payment_link_inr && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Payment link (USD)<span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("payment_link_usd", { required: true })}
                                                    type="text"
                                                    name="payment_link_usd"
                                                    placeholder="Payment link (USD)"
                                                />
                                                {errors.payment_link_usd && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Product Price (INR)<span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("product_price_inr", { required: true })}
                                                    type="text"
                                                    name="product_price_inr"
                                                    placeholder="Product Price (INR)"
                                                />
                                                {errors.product_price_inr && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Product Price (USD)<span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("product_price_usd", { required: true })}
                                                    type="text"
                                                    name="product_price_usd"
                                                    placeholder="Product Price (USD)"
                                                />
                                                {errors.product_price_usd && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
        
                                    </Grid>

                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent="center"
                                        pt={4.7}
                                    >
                                        <SoftBox>
                                            <SoftButton
                                                type="submit"
                                                variant="gradient"
                                                color="dark"
                                                fullWidth
                                            >
                                                Update Product
                                            </SoftButton>
                                        </SoftBox>
                                    </Box>
                                </form>
                            </Card>
                        </SoftBox>
                    </SoftBox>

                    <Footer />
                </DashboardLayout>
            }</>);
}

export default UpdatePassCodeProducts;
