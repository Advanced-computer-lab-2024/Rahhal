"use client";
import { motion } from "framer-motion";

interface LocationToggleProps {
  selected: string;
  setSelected: (selected: string) => void;
  setLocation: (location: { longitude: number; latitude: number }) => void;
  pickUpLocation: { longitude: number; latitude: number };
  dropOffLocation: { longitude: number; latitude: number };
}

export default function LocationToggle({
  selected,
  setSelected,
  setLocation,
  pickUpLocation,
  dropOffLocation,
}: LocationToggleProps) {
  return (
    <div className="inline-flex rounded-full p-1 bg-white border shadow-sm">
      <div className="relative flex">
        <motion.div
          className="absolute top-0 bottom-0 w-1/2 bg-gray-100 rounded-full"
          initial={false}
          animate={{
            x: selected === "pickup" ? 0 : "100%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => {
            setSelected("pickup");
            setLocation(pickUpLocation);
          }}
          className="relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors w-1/2"
          aria-pressed={selected === "pickup"}
        >
          <span className={selected === "pickup" ? "text-gray-900" : "text-gray-600"}>Pickup</span>
        </button>
        <button
          onClick={() => {
            setSelected("dropoff");
            setLocation(dropOffLocation);
          }}
          className="relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors w-1/2"
          aria-pressed={selected === "dropoff"}
        >
          <span className={selected === "dropoff" ? "text-gray-900" : "text-gray-600"}>
            Dropoff
          </span>
        </button>
      </div>
    </div>
  );
}
