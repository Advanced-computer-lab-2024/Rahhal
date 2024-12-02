import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { FlipWords } from "@/components/ui/flip-words";
import GithubGlobe from "@/features/hero/components/GithubGlobe";
import { useNavigate } from "react-router-dom";
const COLORS_TOP = ["#F3DBA2", "#6D91E1"];

export default function AuroraHero() {
  const navigate = useNavigate();

  const color = useMotionValue(COLORS_TOP[0]);
  const words = ["Itineraries", "Activities", "Stays", "Transportations"];

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, #fff 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <>
      <motion.section
        style={{
          backgroundImage,
          marginTop: "-64px",
          paddingLeft: "calc(50% - 45vw)",
        }}
        className="relative grid h-screen overflow-hidden bg-gray-950 px-6 pb-24 pt-0 text-gray-200"
      >
        <div className="grid h-screen grid-cols-12 items-center">
          <div className="col-span-6">
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="max-w-3xl bg-gradient-to-br from-black to-gray-400 bg-clip-text text-center pb-12 text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-8xl md:leading-tight">
                Your <br />
                <FlipWords words={words} /> <br />
                Are on Us!
              </h1>
                <motion.button
                style={{
                  border: "0px solid",
                  boxShadow,
                  width: "200px",
                  height: "50px",
                }}
                whileHover={{
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                onClick={() => {
                    navigate("/entertainment");
                }}
                className="group relative font-bold flex w-fit items-center justify-center gap-1.5 rounded-full bg-[var(--primary-color)] px-4 py-2 text-gray-50 transition-colors"
                >
                Get Started!
                <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
            </div>
          </div>
          <div className="col-span-6">
            <GithubGlobe></GithubGlobe>
          </div>
        </div >
      </motion.section>
    </>
  );
}