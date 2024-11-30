import { motion, useAnimation } from "framer-motion";
import { Bell } from "lucide-react";
import { useEffect } from "react";

interface AnimatedNotificationBellProps {
  color: string;
  animate: boolean; 
}
export default function AnimatedNotificationBell({ color, animate }: AnimatedNotificationBellProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (animate) {
      controls.start({
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5, repeat: 2, ease: "easeInOut" },
      });
    }
  }, [animate, controls]);

  return (
    <motion.div animate={controls} className="relative">
      <Bell size={24} color={color} />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={
          animate ? { scale: [0, 1.2, 1], opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
      />
    </motion.div>
  );
}