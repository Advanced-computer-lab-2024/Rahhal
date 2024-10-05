import { useState, useEffect } from "react";

export default function SideBar() {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const sideBarElements = [
    { title: "Profile", href: "/user-settings" },
    { title: "Account", href: "/user-settings/account" },
  ];

  return (
    <aside className="-mx-4 lg:w-1/5" style={{ minWidth: "100%" }}>
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {sideBarElements.map((element, index) => {
          // Check if the current path matches the element's href
          const isActive = currentPath === element.href;

          return (
            <a
              key={index}
              href={element.href}
              className={`inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 justify-start
                ${isActive ? "bg-muted text-accent-foreground" : "hover:bg-transparent hover:underline"}
              `}
            >
              {element.title}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
