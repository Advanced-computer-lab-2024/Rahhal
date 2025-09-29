import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { IPayload } from "@/types/shared";
import axios from "axios";
import { SERVICES_URLS, STATUS_CODES } from "@/lib/constants";

interface UserState {
  id: string | null;
  setId: (id: string | null) => void;
  username: string | null;
  setUsername: (username: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
  dob: Date | null;
  setDob: (dob: Date | null) => void;
}

// The store states is to be initialized in a useEffect of the top level React component (App.tsx)
const useUserStore = create<UserState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
  username: null,
  setUsername: (username) => set({ username }),
  role: null,
  setRole: (role) => set({ role }),
  dob: null,
  setDob: (dob) => set({ dob }),
}));

export default useUserStore;

export async function UserState() {
  const user = await axios.get(SERVICES_URLS.GENERAL + "/me", { withCredentials: true });
  if (user.status === STATUS_CODES.STATUS_OK) {
    const decoded = user.data;
    useUserStore.setState({
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
      dob: decoded.dob ? decoded.dob : null,
    });
  } else {
    console.log("Unauthorized Access");
    useUserStore.setState({ id: null, username: null, role: "guest", dob: null });
  }
}
