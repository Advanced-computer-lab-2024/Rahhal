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
    try{    
      await axios.delete(`${SERVICES_URLS.USER}/users/${user._id}`);
    alert("User deleted successfully")
    window.location.reload();
  }
  catch(error){
    console.log(user._id)
  }
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

    await axios.post(SERVICES_URLS.USER + "/users", newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response.data);
    });
    alert("User created successfully")
    window.location.reload();
  } else {
    if (user) {

      try{
        await axios.patch(
          `${SERVICES_URLS.USER}/users/${user._id}`,
          JSON.stringify(user),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        alert("User updated successfully")
        window.location.reload();
      }
      catch(error){
      console.log(user)
      console.log(user.approved)
      console.log(error)
    }
    }
  }
}