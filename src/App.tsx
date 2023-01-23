import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useAnimationControls,
} from "framer-motion";
import React, { useState } from "react";

export default function App() {
  let [open, setOpen] = useState(false);
  let controls = useAnimationControls();

  // async function handleClick() {
  function handleOpen(o) {
    setOpen(o);
    // controls.set("closed");
    setTimeout(() => {
      controls.start("open");
    }, 10);
    // controls.set({ opacity: 0 });
    // controls.start({ opacity: 1, transition: { duration: 3 } });
  }

  async function handleClick() {
    //   setOpen(false);
    //   console.log("hi");
    // exit={{
    //   opacity: 0,
    //   transition: {
    //     ease: "easeIn",
    //     duration: 0.05,
    //   },
    // }}
  }

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-sm mx-auto bg-white shadow p-8 rounded w-full">
        <DropdownMenu.Root open={open} onOpenChange={handleOpen}>
          <DropdownMenu.Trigger className="bg-gray-200 px-3 py-1 rounded">
            Menu
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal forceMount={true}>
            {open && (
              <DropdownMenu.Content align="start" asChild forceMount>
                <motion.div
                  initial="closed"
                  animate={controls}
                  variants={{
                    open: {
                      opacity: 1,
                      transition: {
                        ease: "easeOut",
                        // duration: 0.1,
                        duration: 1,
                      },
                    },
                    closed: {
                      opacity: 0,
                      transition: {
                        ease: "easeIn",
                        // duration: 0.05,
                        duration: 2,
                      },
                    },
                  }}
                  // exit={{
                  //   opacity: 0,
                  //   transition: {
                  //     ease: "easeIn",
                  //     duration: 0.05,
                  //   },
                  // }}
                  className="bg-gray-100 rounded text-left"
                >
                  <Item
                    onClick={handleClick}
                    // onClick={() => {
                    //   setOpen(false);
                    //   console.log("hi");
                    // }}
                  >
                    Item 1
                  </Item>
                  <Item
                    onClick={() => {
                      setOpen(false);
                      console.log("hi");
                    }}
                  >
                    Item 2
                  </Item>
                  <Item
                    onClick={() => {
                      setOpen(false);
                      console.log("hi");
                    }}
                  >
                    Item 3
                  </Item>
                </motion.div>
              </DropdownMenu.Content>
            )}
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));

function Item({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  let controls = useAnimationControls();

  return (
    <DropdownMenu.Item
      asChild
      onSelect={async (e) => {
        e.preventDefault();
        await controls.start({
          backgroundColor: "#f3f4f6",
          color: "rgb(28, 25, 23)",
          transition: { duration: 0.05 },
        });
        await controls.start({
          backgroundColor: "#3b82f6",
          color: "rgb(255,255,255)",
          transition: { duration: 0.05 },
        });
        await sleep(0.1);
        await controls.start({
          backgroundColor: "#f3f4f6",
          color: "rgb(28, 25, 23)",
          transition: { duration: 0.05 },
        });
        onClick();
        // setOpen(false);
      }}
      className="w-40 px-2 py-2 data-[highlighted]:bg-blue-500 data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none cursor-pointer"
    >
      <motion.div animate={controls}>{children}</motion.div>
    </DropdownMenu.Item>
  );
}
