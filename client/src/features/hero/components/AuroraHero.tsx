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
import { useTour } from "@/components/AppTour";

const COLORS_TOP = ["#F3DBA2", "#6D91E1"];

export default function AuroraHero() {
  const navigate = useNavigate();
  const { startTour } = useTour();

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
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <>
      <motion.section
        style={{
          backgroundImage,
          marginTop: "-64px",
          paddingLeft: "calc(50% - 45vw)",
        }}
        className="relative grid min-h-dvh overflow-hidden bg-gray-950 px-5 text-gray-200 pb-safe"
      >
        {/* Desktop Layout */}
        <div className="hidden xl:grid h-dvh grid-cols-12 items-center">
          <div className="col-span-5 2xl:col-span-4">
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="max-w-2xl bg-gradient-to-br from-black to-gray-400 bg-clip-text text-center pb-12 text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-8xl md:leading-tight">
                Your <br />
                <FlipWords words={words} /> <br />
                Are on Us!
              </h1>
              <div className="flex space-x-4">
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
                    navigate("/signup");
                  }}
                  className="group relative font-bold flex w-fit items-center justify-center gap-1.5 rounded-full bg-[var(--primary-color)] px-4 py-2 text-gray-50 transition-colors"
                >
                  Get Started!
                  <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>

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
                    setTimeout(startTour, 50);
                  }}
                  className="group relative font-bold flex w-fit items-center justify-center gap-1.5 bg-[var(--complimentary-color)] rounded-full px-4 py-2 text-gray-50 transition-colors"
                >
                  Start Tour
                  <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
              </div>
            </div>
          </div>
          <div className="col-span-7 2xl:col-span-8 flex items-center justify-center h-full">
            <div className="w-full h-full max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] ml-5">
              <GithubGlobe />
            </div>
          </div>
        </div>

        {/* iPad Pro / Large Tablet Layout (1024x1366) */}
        <div className="hidden lg:flex xl:hidden flex-col min-h-dvh pb-safe">
          {/* Globe Section - Top */}
          <div className="flex-1 flex items-center justify-center min-h-[50vh] px-8">
            <div className="w-full max-w-[600px] aspect-square">
              <GithubGlobe />
            </div>
          </div>

          {/* Content Section - Bottom */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 min-h-[40vh]">
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
              <h1 className="bg-gradient-to-br from-black to-gray-400 bg-clip-text text-center pb-8 text-4xl font-medium leading-tight text-transparent md:text-6xl md:leading-tight">
                Your <br />
                <FlipWords words={words} /> <br />
                Are on Us!
              </h1>
              <div className="flex flex-row space-x-6">
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
                    navigate("/signup");
                  }}
                  className="group relative font-bold flex items-center justify-center gap-1.5 rounded-full bg-[var(--primary-color)] px-6 py-3 text-gray-50 transition-colors"
                >
                  Get Started!
                  <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>

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
                    setTimeout(startTour, 50);
                  }}
                  className="group relative font-bold flex items-center justify-center gap-1.5 bg-[var(--complimentary-color)] rounded-full px-6 py-3 text-gray-50 transition-colors"
                >
                  Start Tour
                  <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col min-h-dvh py-4 pb-safe-offset-4">
          {/* Globe Section - Top */}
          <div className="flex-1 flex items-center justify-center px-4 min-h-[40vh]">
            <div className="w-full h-full max-h-[50vh]">
              <GithubGlobe />
            </div>
          </div>

          {/* Content Section - Bottom */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
            <div className="relative z-10 flex flex-col items-center text-center max-w-sm sm:max-w-lg">
              <h1 className="bg-gradient-to-br from-black to-gray-400 bg-clip-text text-center pb-6 sm:pb-8 text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight">
                Your <br />
                <FlipWords words={words} /> <br />
                Are on Us!
              </h1>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:max-w-none">
                <motion.button
                  style={{
                    border: "0px solid",
                    boxShadow,
                  }}
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="group relative font-bold flex items-center justify-center gap-2 rounded-full bg-[var(--primary-color)] px-8 py-4 text-gray-50 transition-colors sm:w-48 text-base sm:text-base"
                >
                  Get Started!
                  <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>

                <motion.button
                  style={{
                    border: "0px solid",
                    boxShadow,
                  }}
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  onClick={() => {
                    navigate("/entertainment");
                    setTimeout(startTour, 50);
                  }}
                  className="group relative font-bold flex items-center justify-center gap-2 bg-[var(--complimentary-color)] rounded-full px-8 py-4 text-gray-50 transition-colors sm:w-48 text-base sm:text-base"
                >
                  Start Tour
                  <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}