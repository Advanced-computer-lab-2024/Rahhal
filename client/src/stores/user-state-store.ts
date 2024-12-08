import { create } from "zustand";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import { IPayload } from "@/types/shared";

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
let decoded = null;
const cookie = Cookies.get('jwt');
if(cookie && cookie.length > 0){
    decoded = jwtDecode<IPayload>(cookie);
}
const useUserStore = create<UserState>((set) => ({
    id: decoded?.id || null,
    setId: (id) => set({ id }),
    username: decoded?.username || null,
    setUsername: (username) => set({ username }),
    role: decoded?.role || "guest",
    setRole: (role) => set({ role }),
    dob: decoded? decoded.dob? decoded.dob : null : null,
    setDob: (dob) => set({ dob }),
}));

export default useUserStore;


export async function UserState() {
  const cookie = Cookies.get('jwt');
  console.log("cookie",cookie)
  if(cookie && cookie.length > 0){
    const decoded = jwtDecode<IPayload>(cookie);
    useUserStore.setState({id: decoded.id, username: decoded.username, role: decoded.role, dob: decoded.dob? decoded.dob : null});
    console.log("decoded",decoded)
  }
  else{
    useUserStore.setState({id: null, username: null, role: "guest", dob: null});
  }
}