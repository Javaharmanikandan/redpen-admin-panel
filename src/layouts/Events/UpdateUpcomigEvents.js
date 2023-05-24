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
function UpdateUpcomigEvents() {
    const { id } = useParams();
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [load, setLoad] = useState(true);

    const [inputList, setInputList] = useState([]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { stepHeading: "", stepDescription: "" }]);
    };

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

    }, []);

    const getDetails = async () => {
        setLoad(true);
        const dataGet = await AuthApi.GetMethod(
            "/get-upcoming-events/" + id,
        );
        setValue("event_title", dataGet.data.data.event_title);
        setValue("event_date", dataGet.data.data.event_date);
        setValue("event_time", dataGet.data.data.event_time);
        setValue("event_location", dataGet.data.data.event_location);
        setValue("event_about", dataGet.data.data.event_about);
        setValue("event_sub_title", dataGet.data.data.event_sub_title);
        setValue("event_url", dataGet.data.data.event_url);
        setValue("event_category", dataGet.data.data.event_category);
        const steps = dataGet.data && dataGet.data.data.event_steps;
        const setps_array = await steps.map((data) => {
            return {
                steps_heading: data.steps_heading,
                steps_description: data.steps_description
            };
        });
        setInputList(setps_array);
        getsubCategoryData();
        setLoad(false);
    };

    const getsubCategoryData = async () => {
        const payload = {
            main_category_id: 1,
        };

        const dataGet = await AuthApi.Postmethod(
            "/get-events-sub-category",
            payload
        );

        setSubCategoryData(dataGet.data.data);
    };




    //To Insert All Data

    const onSubmit = async (data) => {
        let formData = new FormData(); //formdata object

        data.event_image ? formData.append("image", data.event_image[0]) : "";
        data.mobile_banner ? formData.append("mobile_banner", data.mobile_banner[0]) : "";
        data.desktop_banner ? formData.append("desktop_banner", data.desktop_banner[0]) : "";
        formData.append("event_category", data.event_category);
        formData.append("event_date", data.event_date);
        formData.append("event_time", data.event_time);
        formData.append("event_title", data.event_title);
        formData.append("event_location", data.event_location);
        formData.append("event_about", data.event_about);
        formData.append("event_sub_title", data.event_sub_title);
        formData.append("event_url", data.event_url);
        formData.append("steps", JSON.stringify(inputList));

        const dataPost = await AuthApi.PostmethodWithFile(
            "/update-upcoming-events/" + id,
            formData
        );
        if (dataPost.data.status) {
            toast.success(dataPost.data.message);
        } else {
            toast.error(dataPost.data.message);
        }
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
                                        Update Upcoming Event
                                    </SoftTypography>
                                </SoftBox>
                                <form
                                    key={3}
                                    style={{ padding: "20px" }}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Event Category <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>

                                                <select
                                                    className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                                    name="event_category"
                                                    {...register("event_category", { required: true })}
                                                >
                                                    <option value="" selected>
                                                        Select Event Category
                                                    </option>
                                                    {subCategoryData &&
                                                        subCategoryData.map((result, index) => {
                                                            return (
                                                                <option value={result.id}>
                                                                    {result.sub_category_name}
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                                {errors.event_category && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Event URL <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_url", { required: true })}
                                                    type="text"
                                                    name="event_url"
                                                    placeholder="Event URL"
                                                />
                                                {errors.event_url && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Event Date <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_date", { required: true })}
                                                    type="date"
                                                    name="event_date"
                                                    placeholder="Event Date"
                                                />
                                                {errors.event_date && (
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
                                                        Event Time <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_time", { required: true })}
                                                    type="time"
                                                    name="event_time"
                                                    placeholder="Event Time"
                                                />
                                                {errors.event_time && (
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
                                                        Event Title <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_title", { required: true })}
                                                    type="text"
                                                    name="event_title"
                                                    inputProps={{
                                                        maxLength: 85,
                                                    }}
                                                    placeholder="Event Title "
                                                />
                                                {errors.event_title && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Event Image <span className="Errorspan"></span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_image")}
                                                    type="file"
                                                    name="event_image"
                                                    placeholder="Upload Image"
                                                />
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Event Location <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_location", { required: true })}
                                                    type="text"
                                                    name="event_location"
                                                    placeholder="Event Location"
                                                />
                                                {errors.event_location && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                     
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Mobile Banner Image <span className="Errorspan"></span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("mobile_banner")}
                                                    type="file"
                                                    name="mobile_banner"
                                                    placeholder="Upload Image"
                                                />
                                    
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Desktop Banner Image <span className="Errorspan"></span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("desktop_banner")}
                                                    type="file"
                                                    name="desktop_banner"
                                                    placeholder="Upload image"
                                                />
                                                {errors.desktop_banner && (
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
                                                        Event Sub Title(H2) <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    {...register("event_sub_title", { required: true })}
                                                    type="text"
                                                    name="event_sub_title"
                                                    placeholder="Sub title"
                                                />
                                                {errors.event_sub_title && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        About the Event <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>

                                                <textarea
                                                    placeholder="About the Event.."
                                                    style={{
                                                        width: "100%",
                                                        height: 120,
                                                        border: "0.0625rem solid #d2d6da",
                                                        padding: "12px 20px",
                                                        fontSize: "16px",
                                                        borderRadius: 10,
                                                    }}
                                                    name="event_about"
                                                    {...register("event_about", { required: true })}
                                                ></textarea>
                                                {errors.event_about && (
                                                    <span className="Errorspan">
                                                        * Please fill this field!
                                                    </span>
                                                )}
                                            </SoftBox>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <SoftBox mb={2}>
                                                <SoftBox mb={1} ml={0.5}>
                                                    <SoftTypography
                                                        component="label"
                                                        variant="caption"
                                                        fontWeight="bold"
                                                    >
                                                        Event Webinar steps cover{" "}
                                                        <span className="Errorspan">*</span>
                                                    </SoftTypography>
                                                </SoftBox>

                                                {inputList.map((x, i) => {
                                                    return (
                                                        <div style={{ display: "flex", padding: 10 }}>
                                                            <SoftInput
                                                                type="text"
                                                                name="steps_heading"
                                                                placeholder="Step Heading"
                                                                value={x.steps_heading}
                                                                onChange={(e) => handleInputChange(e, i)}
                                                            />
                                                            <SoftInput
                                                                style={{ marginLeft: 10 }}
                                                                name="steps_description"
                                                                placeholder="Enter Step Description "
                                                                value={x.steps_description}
                                                                onChange={(e) => handleInputChange(e, i)}
                                                            />
                                                            <div style={{ display: "flex" }}>
                                                                {inputList.length !== 1 && (
                                                                    <button
                                                                        style={{
                                                                            marginLeft: 10,
                                                                            width: 40,
                                                                            background: "#da353b",
                                                                            color: "white",
                                                                            padding: 5,
                                                                            border: "none",
                                                                            borderRadius: 5,
                                                                        }}
                                                                        onClick={() => handleRemoveClick(i)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                )}
                                                                {inputList.length - 1 === i && (
                                                                    <button
                                                                        style={{
                                                                            marginLeft: 10,
                                                                            width: 40,
                                                                            background: "green",
                                                                            color: "white",
                                                                            padding: 5,
                                                                            border: "none",
                                                                            borderRadius: 5,
                                                                        }}
                                                                        onClick={() => { handleAddClick() }}
                                                                    >
                                                                        +
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
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
                                                Update Upcoming Event
                                            </SoftButton>
                                        </SoftBox>
                                    </Box>
                                </form>
                            </Card>
                        </SoftBox>
                    </SoftBox>

                    <Footer />
                </DashboardLayout>
            }</> );
}

export default UpdateUpcomigEvents;
