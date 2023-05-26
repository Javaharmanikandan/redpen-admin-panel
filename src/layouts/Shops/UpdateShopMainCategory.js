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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
// Data
import Grid from "@mui/material/Grid";
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AuthApi from "api/auth";
import { useParams } from "react-router-dom";



function UpdateShopMainCategory() {
    const { id } = useParams();
    const [load, setLoad] = useState(false);
    const [colorsData, setColorsData] = useState([]);

    const {
        register: registerSub,
        handleSubmit: handleSubmitSub,
        reset: resetSub,
        setValue: setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getColors();
        getDetails();
       
    }, []);

    const getColors = async () => {
        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-colors"
        );

        setColorsData(dataGet.data.data);
        setLoad(false);
    };

    const getDetails = async () => {
        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-shop-category/" + id,
        );
        setTimeout(() => {
            setValue("category_level", dataGet.data.data.category_level);
            setValue("chip_text_color", dataGet.data.data.chip_text_color);
            setValue("chip_background_color", dataGet.data.data.chip_background_color);
        }, 1000);
        setValue("category_name", dataGet.data.data.category_name);
        setLoad(false);
    };

    //After Submit Category

    const onSubmitSub = async (data) => {
        setLoad(true);
        const payLoad = {
            category_level: data.category_level,
            category_name: data.category_name,
            chip_text_color: data.chip_text_color,
            chip_background_color: data.chip_background_color
        };

        const dataPost = await AuthApi.Postmethod(
            "/update-shop-category/"+id,
            payLoad
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
                                    <SoftTypography variant="h6">Update Shop Category </SoftTypography>
                                </SoftBox>
                                <form
                                    key={2}
                                    style={{ padding: "20px" }}
                                    onSubmit={handleSubmitSub(onSubmitSub)}
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
                                                        Shop  Category *
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...registerSub("category_name", { required: true })}
                                                    type="text"
                                                    name="category_name"
                                                    placeholder=" Category Name"
                                                />
                                                {errors.category_name && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={2} lg={2}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Category Level *
                                                    </SoftTypography>
                                                </SoftBox>
                                                <select
                                                    className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                                    name="category_level"
                                                    {...registerSub("category_level", { required: true })}
                                                >
                                                    <option value="" selected disabled hidden>
                                                        Select  level
                                                    </option>
                                                    <option value={1} >
                                                        Level 1
                                                    </option>
                                                    <option value={2}>
                                                        Level 2
                                                    </option>


                                                </select>

                                                {errors.category_level && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>)}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={2} lg={2}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Text Color <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>

                                                <select
                                                    className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                                    name="chip_text_color"

                                                    {...registerSub("chip_text_color", { required: true })}
                                                >
                                                    <option value="" selected>
                                                        Select color
                                                    </option>
                                                    {colorsData &&
                                                        colorsData.map((result, index) => {
                                                            return (
                                                                <option value={result.id}>
                                                                    {result.color_name}
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                                {errors.chip_text_color && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={2} lg={2}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Background Color <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>

                                                <select
                                                    className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                                    name="chip_background_color"

                                                    {...registerSub("chip_background_color", { required: true })}
                                                >
                                                    <option value="" selected>
                                                        Select color
                                                    </option>
                                                    {colorsData &&
                                                        colorsData.map((result, index) => {
                                                            return (
                                                                <option value={result.id}>
                                                                    {result.color_name}
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                                {errors.chip_background_color && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                                        Update  Category
                                                    </SoftButton>

                                                </SoftBox>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Card>
                        </SoftBox>
                    </SoftBox>


                    <Footer />
                </DashboardLayout>
            }</>);
}

export default UpdateShopMainCategory;
