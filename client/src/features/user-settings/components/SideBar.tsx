import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { EditContext } from "./SettingsView";
import useUserStore from "@/stores/user-state-store";
export default function SideBar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  // const { id } = useParams();
  const { id } = useUserStore();
  const { user } = useContext(EditContext);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const sideBarElements = [
    { title: "Profile", to: `/user-settings/${id}` },
    { title: "Account", to: `/user-settings/account/${id}` },
  ];

  if (user.role === "tourist") {
    sideBarElements.push({ title: "Payment", to: `/user-settings/wallet/${id}` });
  }

  return (
    <aside className="-mx-4 lg:w-1/5" style={{ minWidth: "100%" }}>
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 overflow-auto">
        {sideBarElements.map((element, index) => {
          // Check if the current path is exactly the element's to
          const isActive = currentPath === element.to;

          return (
            <Link
              key={index}
              to={element.to}
              className={`inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 justify-start
                ${isActive ? "bg-muted text-accent-foreground" : "hover:bg-transparent hover:underline"}
              `}
            >
              {element.title === "Profile" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  style={{marginRight: "0.5rem"}}
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
              )}
              {element.title === "Account" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  style={{marginRight: "0.5rem"}}
                >
                  <path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z" />
                </svg>
              )}
              {element.title === "Payment" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  style={{marginRight: "0.5rem"}}
                >
                  <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" />
                </svg>
              )}
              {element.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
