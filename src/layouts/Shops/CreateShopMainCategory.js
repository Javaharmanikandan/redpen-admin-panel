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


function CreateShopMainCategory() {
  
  const [load, setLoad] = useState(false);
  
  const {
    register: registerSub,
    handleSubmit: handleSubmitSub,
    reset: resetSub,
    formState: { errors },
  } = useForm();

 

  //After Submit Sub Category

  const onSubmitSub = async (data) => {
    setLoad(true);
    const payLoad = {
      category_level: data.category_level,
      category_name: data.category_name,
      chip_text_color: data.chip_text_color,
      chip_background_color: data.chip_background_color
    };

    const dataPost = await AuthApi.Postmethod(
      "/create-shop-category",
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
              <SoftTypography variant="h6">Create Shop Category </SoftTypography>
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
                            Text Color *
                          </SoftTypography>
                        </SoftBox>
                        <select
                          className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                          name="chip_text_color"
                          {...registerSub("chip_text_color", { required: true })}
                        >
                          <option value="" selected disabled hidden>
                            Select  color
                          </option>
                      
                          <option value={'#FBBB3B'} style={{ color: '#FBBB3B' }}>
                            Pastel Orange
                          </option>
                          <option value={'#FFFFFF'} style={{ color: '#FFFFFF' }}>
                            White
                          </option>
                          <option value={'#1A1757'} style={{ color: '#1A1757' }}>
                            Space Cadet
                          </option>
                        </select>

                        {errors.chip_text_color && (
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
                            Background Color *
                          </SoftTypography>
                        </SoftBox>
                        <select
                          className="MuiInputBase-root MuiInputBase-colorPrimary css-y9gdep-MuiInputBase-root"
                          name="chip_background_color"
                          {...registerSub("chip_background_color", { required: true })}
                        >
                          <option value="" selected disabled hidden>
                            Select  color
                          </option>
                          <option value={'#1A1757'} style={{ backgroundColor: '#1A1757' }} >
                            Space Cadet
                          </option>
                          <option value={'#0EA7AF'} style={{ backgroundColor: '#0EA7AF' }}>
                            Blue-Green
                          </option>
                          <option value={'#D82128'} style={{ backgroundColor: '#D82128' }}>
                            Amaranth Red
                          </option>
                          <option value={'#8080A1'} style={{ backgroundColor: '#8080A1' }}>
                            Light Slate Gray
                          </option>
                          <option value={'#404040'} style={{ backgroundColor: '#404040' }} >
                            Black Olive
                          </option>
                          <option value={'#26797D'} style={{ backgroundColor: '#26797D' }}>
                            Celadon Green
                          </option>
                          <option value={'#DAD2D8'} style={{ backgroundColor: '#DAD2D8' }}>
                            Light Silver
                          </option>
                          <option value={'#FBBB3B'} style={{ backgroundColor: '#FBBB3B' }}>
                            Pastel Orange
                          </option>
                        
                        </select>

                        {errors.chip_background_color && (
                          <span className="Errorspan">
                            * Please fill this field!
                          </span>)}
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
                        Add  Category
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

export default CreateShopMainCategory;
