/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import brand from "assets/images/logo-ct.svg";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

import AuthApi from "../../../api/auth";

import { useAuth } from "auth-context/auth.context";

function SignUp() {
  const navigate = useNavigate();

  const [agreement, setAgremment] = useState(true);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleSetAgremment = () => setAgremment(!agreement);

  const handleFormData = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    const response = await AuthApi.Postmethod(
      "/auth/admin_login",
      formData
    );

    console.log(response)

       if (response.data.success) {
        localStorage.setItem('adminLoginRed',true)
        alert("Login Success")
          return navigate("/dashboard");
        } else {
         alert("Invalid Account Details")
        }
      
     
        
  };

  const handleRedirect = () => navigate("/dashboard");

  return (
    <BasicLayout
      title="Welcome!"
      description="Please Login to your account!"
      image={curved6}
    >
      {user && user.token ? (
        <Card>
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" buttonColor="info" fullWidth onClick={handleRedirect}>
              {`Let's go`}
            </SoftButton>
          </SoftBox>
        </Card>
      ) : (
        <Card>
        
         
       
          <SoftBox pt={2} pb={3} px={3} sx={{margin:2}}>

           
            <SoftBox component="form" role="form">
           <center> <img src={brand} style={{marginTop:10,marginBottom:30}}/></center>
              <SoftBox mb={2}>
                <SoftInput
                  type="text"
                  name="username"
                  placeholder="User Name"
                  onChange={handleFormData}
                />
              </SoftBox>
              
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  name="password"
                  onChange={handleFormData}
                  placeholder="Password"
                />
              </SoftBox>
             
             
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="dark" onClick={handleSubmit} fullWidth>
                  sign in
                </SoftButton>
              </SoftBox>
         
            </SoftBox>
          </SoftBox>
        </Card>
      )}
    </BasicLayout>
  );
}

export default SignUp;
