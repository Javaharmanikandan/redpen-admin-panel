import axios from "./index";
import { API_SERVER } from "config/constant";

class AuthApi {


    static Postmethod = (url,payload) =>{

      return axios.post(API_SERVER+url ,payload);

    }
    static PostmethodWithFile = (url,payload) =>{

   

      return axios.post(API_SERVER+url ,payload,{
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*" 
          
        },
      });

    }

    static GetMethod = (url) =>{

      return axios.get(API_SERVER+url );

    }






  static deleteDynamic = (formData) => {
    return axios.post(`${API_SERVER}/admin/auth/delete_common`,formData);
  };


  static CreateSpecialist = (formData) => {
    
    return axios.post(`${API_SERVER}/admin/auth/create_specialist`,formData, {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*" 
        
      },
    });
  };

  static CreateTestimonial = (formData) => {
    console.log(formData)
    return axios.post(`${API_SERVER}/admin/auth/create_testimonials`,formData);
  };
 
  



  static TherapistDetails = (data) => {
    return axios.post(`${API_SERVER}/auth/therapist_profile`, data);
  };

  
}

export default AuthApi;
