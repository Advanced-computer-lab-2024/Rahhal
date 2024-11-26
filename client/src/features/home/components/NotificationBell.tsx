import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Bell } from "lucide-react";

interface AnimatedNotificationBellProps {
  color: string;
}
export default function AnimatedNotificationBell({ color }: AnimatedNotificationBellProps) {
  const [isRinging, setIsRinging] = useState(false);
  const controls = useAnimation();

  const ringBell = async () => {
    setIsRinging(true);
    await controls.start({
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, repeat: 2, ease: "easeInOut" },
    });
    setIsRinging(false);
  };

  useEffect(() => {
    if (isRinging) {
      controls.start({
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5, repeat: 2, ease: "easeInOut" },
      });
    } else {
      controls.stop();
    }
  }, [isRinging, controls]);

  return (
    <button
      onClick={ringBell}
      aria-label={isRinging ? "Notification bell ringing" : "Ring notification bell"}
    >
      <motion.div animate={controls} className="relative">
        <Bell size={24} color={color} />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isRinging ? { scale: [0, 1.2, 1], opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.3 }}
          className="absolute -top-1 -right-1 w-3 h-3  rounded-full"
        />
      </motion.div>
    </button>
  );
}
