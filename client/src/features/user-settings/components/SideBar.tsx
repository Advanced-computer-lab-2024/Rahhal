import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { EditContext } from "./SettingsView";

export default function SideBar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const { id } = useParams();
  const { user } = useContext(EditContext);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const sideBarElements = [
    { title: "Profile", to: `/user-settings/${id}` },
    { title: "Account", to: `/user-settings/account/${id}` }
  ];

  if(user.role === "tourist") {
    sideBarElements.push({ title: "Wallet", to: `/user-settings/wallet/${id}` })
  }

  return (
    <aside className="-mx-4 lg:w-1/5" style={{ minWidth: "100%" }}>
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
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
              {element.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
