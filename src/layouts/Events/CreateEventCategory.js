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


function CreateEventCategory() {
  

  const [mainCategoryData,setMainCategoryData] =useState([]);
  const [load, setLoad] = useState(false);
  
  const {
    register: registerSub,
    handleSubmit: handleSubmitSub,
    reset: resetSub,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    
    getMainCategoryData();

  }, []);

  //To Fetch Data Main Category 

  const getMainCategoryData = async () => {
    setLoad(true);
    const dataGet = await AuthApi.GetMethod("/get-events-main-category");
   
    setMainCategoryData(dataGet.data.data);
    setLoad(false);

  }

  

 


  //After Submit Sub Category

  const onSubmitSub = async (data) => {
    setLoad(true);
    const payLoad = {
      main_category: data.MainCategory,
      sub_category_name: data.SubCategory,
    };

    const dataPost = await AuthApi.Postmethod(
      "/create-events-sub-category",
      payLoad
    );

    if (dataPost.data.status) {
      toast.success(dataPost.data.message);
      resetSub();
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
              <SoftTypography variant="h6">Create Sub Category</SoftTypography>
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
                        Main Category Category *
                      </SoftTypography>
                    </SoftBox>
                    <select
                      className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                      name="gender"
                      {...registerSub("MainCategory", { required: true })}
                    >
                      <option value="" selected disabled hidden>
                        Select Main Category
                      </option>

                      {mainCategoryData && mainCategoryData.map((result,index) => {
            return ( 
                      <option value={result.id}>{result.main_category_name}</option>
                    
            )})}
                    </select>

                    {errors.MainCategory && (
                      <span className="Errorspan">
                        * Please fill this field!
                      </span>)}
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
                        Sub Category Category *
                      </SoftTypography>
                    </SoftBox>
                    <SoftInput
                      {...registerSub("SubCategory", { required: true })}
                      type="text"
                      name="SubCategory"
                      placeholder="Sub Category Name"
                    />
                    {errors.SubCategory && (
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
                        Add Sub Category
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

export default CreateEventCategory;
