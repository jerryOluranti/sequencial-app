import axios from "../../api/axios";
import { retrieveAppData } from "../../../helper_functions/storingAppData";

export async function update_job_seeker(data: any, token: any) {
  if (!data || !token) return;

  const response = await axios.patch(`auth/jobseeker-profile/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("response", response.data);

  return response.data;
}

export async function fetch_user_data() {
  const token = await retrieveAppData("token");

  const response = await axios.get(`auth/jobseeker-profile/`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.access}`,
    },
  });

  console.log("response", response.data);

  return response.data;
}
