import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);

  let controls = useAnimation();

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-sm mx-auto bg-white shadow p-8 rounded w-full">
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger className="bg-gray-200 px-3 py-1 rounded">
            Menu
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal forceMount={true}>
            {/* <AnimatePresence> */}
            {/* {open && (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1.01,
                    transition: { ease: "easeOut", duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: {
                      ease: "easeIn",
                      duration: 0.5,
                      scale: 0.95,
                    },
                  }}
                > */}
            <AnimatePresence>
              {open && (
                <DropdownMenu.Content align="start" asChild forceMount>
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      // x: "foo",
                      // y: "foo",
                      // z: "foo",
                    }}
                    animate={{
                      opacity: 1,
                      // scale: 1.01,
                      transition: { ease: "easeOut", duration: 0.1 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        ease: "easeIn",
                        duration: 0.05,
                        scale: 0.95,
                      },
                    }}
                    className="bg-gray-100 rounded text-left"
                  >
                    {/* <DropdownMenu.Item
                      asChild
                      onSelect={async (e) => {
                        e.preventDefault();
                        await controls.start({
                          backgroundColor: "#3b82f6",
                          transition: { duration: 0.05 },
                        });
                        await sleep(0.1);
                        await controls.start({
                          backgroundColor: "#f3f4f6",
                          transition: { duration: 0.05 },
                        });
                        setOpen(false);
                      }}
                      className="w-40 px-2 py-2"
                    >
                      <motion.div animate={controls}>Item 1</motion.div>
                    </DropdownMenu.Item> */}
                    <Item
                      onClick={() => {
                        setOpen(false);
                        console.log("hi");
                      }}
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
            </AnimatePresence>
            {/* </motion.div>
              )} */}
            {/* </AnimatePresence> */}
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
  let controls = useAnimation();

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
