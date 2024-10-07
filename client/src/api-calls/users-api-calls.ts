import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { TUser } from "@/table-columns/user-columns";


// fetch data from the server
export const fetchUsers = async () => {
  const response = await axios.get(SERVICES_URLS.USER + "/users");
  return response.data;
};

// delete user from users endpoint
export const deleteUser = async (user: TUser) => {
    
    await axios.delete(`${SERVICES_URLS.USER}/users/${user._id}`);
};

// submit user to the users endpoint
export const submitUser = async (user: TUser | undefined, isNewUser: boolean) => {
    console.log(user);
  if (isNewUser) {

    // Create a new user with only username, password, role and appoved fields

    const newUser = {
      username: user?.username,
      password: user?.password,
      role: user?.role,
      approved: true,
    }

    await axios.post(SERVICES_URLS.USER + "/users", newUser).then((response) => {
      console.log(response.data);
    });
  } else {
    if (user) {
      await axios.patch(
        `${SERVICES_URLS.USER}/users/${user._id}`,
        user,
      ).then((response) => {
        console.log(response.data);
      });
    }
  }
}