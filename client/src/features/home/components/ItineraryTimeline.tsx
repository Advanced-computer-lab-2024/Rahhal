import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export interface TimelineItem {
  location: string;
  duration: string;
}
interface TimelineProps {
  timelineData: TimelineItem[];
}

function TimelineItem({
  item,
  index,
  length,
}: {
  item: TimelineItem;
  index: number;
  length: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.2,
          },
        },
      }}
      className="relative pl-8 pb-8 group"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={controls}
        variants={{
          hidden: { scale: 0 },
          visible: {
            scale: 1,
            transition: {
              duration: 0.2,
              delay: index * 0.2 + 0.3,
            },
          },
        }}
        className="absolute left-0 w-3 h-3 bg-[var(--complementary)] rounded-full"
      />

      {index !== length - 1 && (
        <motion.div
          initial={{ height: 0 }}
          animate={controls}
          variants={{
            hidden: { height: 0 },
            visible: {
              height: "100%",
              transition: {
                duration: 0.5,
                delay: index * 0.2 + 0.3,
              },
            },
          }}
          className="absolute left-[5px] top-3 w-[2px] h-full bg-[var(--complementary)]"
        />
      )}

      <div className="space-y-1">
        <div className="font-semibold text-lg">{item.location}</div>
        <div className="text-sm text-muted-foreground">{`Visit Duration: ${item.duration}`}</div>
      </div>
    </motion.div>
  );
}

export default function Timeline({ timelineData }: TimelineProps) {
  return (
    <div className="max-w-2xl bg-card rounded-lg ">
      <div className="space-y-2">
        {timelineData.map((item, index) => (
          <TimelineItem item={item} index={index} length={timelineData.length} />
        ))}
      </div>
    </div>
  );
}
