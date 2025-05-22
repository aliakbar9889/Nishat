"use client";
import React from "react";
import Image from "next/image"; // import Next.js Image component
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";

import { motion } from "motion/react";

export function AnimatedModalDemo() {
  const images: string[] = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="py-40 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn relative px-6 py-3 rounded-lg overflow-hidden">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500 font-manrope">
            Proceed To Checkout
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            ✔️
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Book your trip to{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Bali
              </span>{" "}
              now! ✈️
            </h4>

            <div className="flex justify-center items-center flex-wrap gap-2">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="bali images"
                    width={160}  // optimized sizes for Next/Image
                    height={160}
                    className="rounded-lg object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <IconText icon={<PlaneIcon />} text="5 connecting flights" />
              <IconText icon={<ElevatorIcon />} text="12 hotels" />
              <IconText icon={<VacationIcon />} text="69 visiting spots" />
              <IconText icon={<FoodIcon />} text="Good food everyday" />
              <IconText icon={<MicIcon />} text="Open Mic" />
              <IconText icon={<ParachuteIcon />} text="Paragliding" />
            </div>
          </ModalContent>

          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center justify-center">
    <div className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4">{icon}</div>
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">{text}</span>
  </div>
);

// Icons: Now properly typed without any `any`

interface IconProps {
  className?: string;
}

const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
  children,
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const PlaneIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
  </IconBase>
);

const VacationIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
    <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
    <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
    <path d="M15 9l-3 5.196" />
    <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
  </IconBase>
);

const ElevatorIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M4 4h16v16H4z" />
    <path d="M8 4v16" />
    <path d="M16 4v16" />
    <path d="M10 10l2 -2l2 2" />
    <path d="M10 14l2 2l2 -2" />
  </IconBase>
);

const FoodIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M4 3h16v2H4z" />
    <path d="M6 5v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2V5" />
  </IconBase>
);

const MicIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M12 1v11" />
    <path d="M8 5a4 4 0 0 0 8 0" />
    <path d="M5 9v1a7 7 0 0 0 14 0v-1" />
    <path d="M12 19v4" />
    <path d="M8 23h8" />
  </IconBase>
);

const ParachuteIcon: React.FC<IconProps> = (props) => (
  <IconBase {...props}>
    <path d="M4 4a8 8 0 0 1 16 0v2H4V4z" />
    <path d="M12 6v10" />
    <path d="M12 16l-4 6" />
    <path d="M12 16l4 6" />
  </IconBase>
);
