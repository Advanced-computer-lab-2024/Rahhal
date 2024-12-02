import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { TUser } from "@/types/user";
import { UserState } from "@/stores/user-state-store";

// fetch data from the server
export async function fetchUsers() {
  const response = await axios.get(SERVICES_URLS.USER + "/users");
  return response.data;
}

export async function fetchUsersPendingRequests() {
  const response = await axios.get(SERVICES_URLS.USER + "/users/requests");
  return response.data as TUser[];
}

export async function updateUser(user: TUser, updates: Partial<TUser>) {
  const response = await axios.patch(SERVICES_URLS.USER + `/users/${user._id}`, updates);
  return response.data;
}

//get user by user by id
export const getUserById = async (id: string): Promise<TUser> => {
  const response = await axios.get<TUser>(`${SERVICES_URLS.USER}/users/${id}`);
  return response.data;
};

// delete user from users endpoint
export async function deleteUser(id: string) {
  const response = await axios.delete(`${SERVICES_URLS.USER}/users/${id}`);
  return response;
}

export async function deleteUserNoReload(user: TUser) {
  await axios.delete(`${SERVICES_URLS.USER}/users/${user._id}`);
}

// submit user to the users endpoint
export async function submitUser(user: TUser | undefined, isNewUser: boolean) {
  if (isNewUser) {
    // Create a new user with only username, password, role and appoved fields

    const newUser = {
      username: user?.username,
      password: user?.password,
      role: user?.role,
      approved: true,
    };

    const response = await axios.post(SERVICES_URLS.USER + "/users", newUser);
    return response;
  } else {
    if (user) {
      const response = await axios.patch(`${SERVICES_URLS.USER}/users/${user._id}`, user);
      return response;
    }
  }
}

export async function createUser(newUser: any) {
  const response = await axios.post(SERVICES_URLS.GENERAL + "/signup", newUser);
  return response.data;
}

export async function addLoyalityPoints(id: string, amountPaid: number) {
  const response = await axios.patch(`${SERVICES_URLS.USER}/users/${id}?amountPaid=${amountPaid}`);
  return response.data;
}

export async function refundMoney(id: string, amountPaid: number) {
  const response = await axios.patch(
    `${SERVICES_URLS.USER}/users/${id}?amountRetrieved=${amountPaid}`,
  );
  return response.data;
}

export async function redeemLoyalityPoints(id: string) {
  const response = await axios.patch(`${SERVICES_URLS.USER}/users/${id}/redeem`);
  return response.data;
}

export async function getAdmins() {
  const response = await axios.get<TUser[]>(SERVICES_URLS.USER + "/users", {
    params: { role: "admin" },
  });

  // filter out the admins
  return response.data.filter((user: TUser) => user.role === "admin");
}

export async function getNumberOfUsers(startDate?: Date, endDate?: Date) {
  const response = await axios.get(SERVICES_URLS.USER + "/users/number-of-users", {
    params: {
      startDate: startDate,
      endDate: endDate,
    },
  });
  return response.data;
}
export async function loginUser(credentials: any) {
  const response = await axios.post(
    SERVICES_URLS.AUTHENTICATION + "/login", 
    credentials,
    {
      withCredentials: true,
    }
  );
  return response;
};

export async function logoutUser() {
  const response = await axios.post(SERVICES_URLS.GENERAL + "/logout", {
    withCredentials: true,
  });
  return response;
};
