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

function UpdateBlog() {
    const { id } = useParams();
    
    const [MainCategoryData, setMainCategoryData] = useState([]);

    const [inputList, setInputList] = useState([""]);


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index] = value;
        setInputList(list);


        console.log(inputList, "e");
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, ""]);
    };



    const {
        register,
        handleSubmit,
        watch,
        setValue: setValue,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getmainCategoryData();
        getDetails();
    }, []);

    const getDetails = async () => {
        const dataGet = await AuthApi.GetMethod(
            "/get-blog/" + id,
        );
        setValue("category_id", dataGet.data.data.category_id);
        setValue("date", dataGet.data.data.date);
        setValue("blog_title", dataGet.data.data.blog_title);
        setValue("blog_describtion", dataGet.data.data.blog_describtion);
        setValue("post_by", dataGet.data.data.post_by);
        setValue("post_type", dataGet.data.data.post_type);
        setValue("blog_url", dataGet.data.data.blog_url);

        const tags = dataGet.data.data.blog_tags;
        for (let index = 0; index < tags.length; index++) {
     
        }
    };

    const getmainCategoryData = async () => {
        const dataGet = await AuthApi.GetMethod(
            "/get-blog-category"
        );
        setMainCategoryData(dataGet.data.data);
    };

    //To Insert All Data

    const onSubmit = async (data) => {
        let formData = new FormData(); //formdata object
        data.blog_image ?   formData.append("blog_image", data.blog_image[0]):"";
        formData.append("category_id", data.category_id);
        formData.append("date", data.date);
        formData.append("blog_title", data.blog_title);
        formData.append("post_by", data.post_by);
        formData.append("post_type", data.post_type);
        formData.append("blog_describtion", data.blog_describtion);
        formData.append("blog_tags", JSON.stringify(inputList));
        const dataPost = await AuthApi.PostmethodWithFile(
            "/update-blog/"+id,
            formData
        );
        if (dataPost.data.status) {
            toast.success(dataPost.data.message);
        } else {
            toast.error(dataPost.data.message);
        }
    };




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
                            <SoftTypography variant="h6">
                                Update New Blog
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
                                                Blog  <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>

                                        <select
                                            className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                                            name="category_id"

                                            {...register("category_id", { required: true })}
                                        >
                                            <option value="" selected>
                                                Select Category
                                            </option>
                                            {MainCategoryData &&
                                                MainCategoryData.map((result, index) => {
                                                    return (
                                                        <option value={result.id}>
                                                            {result.category_name}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        {errors.category_id && (
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
                                                Date <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("date", { required: true })}
                                            type="date"
                                            name="date"
                                            placeholder="Date"
                                        />
                                        {errors.date && (
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
                                                Blog Title <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("blog_title", { required: true })}
                                            type="text"
                                            name="blog_title"
                                            placeholder="Blog Title "
                                        />
                                        {errors.blog_title && (
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
                                                Blog Image <span className="Errorspan"></span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("blog_image")}
                                            type="file"
                                            name="blog_image"
                                            placeholder="Blog Image"
                                        />
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
                                                Post By <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("post_by", { required: true })}
                                            type="text"
                                            name="post_by"
                                            placeholder="Post By"
                                        />
                                        {errors.post_by && (
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
                                                Post Type <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("post_type", { required: true })}
                                            type="text"
                                            name="post_type"
                                            placeholder="Post Type"
                                        />
                                        {errors.post_type && (
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
                                                BLog URL <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>
                                        <SoftInput
                                            {...register("blog_url", { required: true })}
                                            type="text"
                                            name="blog_url"
                                            placeholder="Blog URL"
                                        />
                                        {errors.blog_url && (
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
                                                Blog Description <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>

                                        <textarea
                                            placeholder="About the Product.."
                                            style={{
                                                width: "100%",
                                                height: 120,
                                                border: "0.0625rem solid #d2d6da",
                                                padding: "12px 20px",
                                                fontSize: "16px",
                                                borderRadius: 10,
                                            }}
                                            name="blog_describtion"
                                            {...register("blog_describtion", { required: true })}
                                        ></textarea>
                                        {errors.blog_describtion && (
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
                                                Blog tags{" "}
                                                <span className="Errorspan">*</span>
                                            </SoftTypography>
                                        </SoftBox>

                                        {inputList.map((x, i) => {
                                            return (
                                                <div style={{ display: "flex", padding: 10 }}>
                                                    <SoftInput
                                                        type="text"
                                                        name="blog_tags"
                                                        placeholder="Content"
                                                        value={x.stepHeading}
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
                                                                onClick={handleAddClick}
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
                                        Update Blog
                                    </SoftButton>
                                </SoftBox>
                            </Box>
                        </form>
                    </Card>
                </SoftBox>
            </SoftBox>

            <Footer />
        </DashboardLayout>
    );
}

export default UpdateBlog;
