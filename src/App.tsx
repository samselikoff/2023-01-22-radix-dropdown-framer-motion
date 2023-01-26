import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";

const DropdownContext = createContext<{ closeMenu: () => void }>({
  closeMenu: () => {},
});

export default function App() {
  let [open, setOpen] = useState(false);
  let [foo, setFoo] = useState("Select an item");
  let controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      controls.start("open");
    }
  }, [open, controls]);

  async function closeMenu() {
    await controls.start("closed");
    setOpen(false);
  }

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-md overflow-hidden w-full">
        <header className="border-b border-gray-100 p-2">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger className="px-4 py-1 rounded select-none data-[state=open]:bg-gray-200/75 focus-visible:outline-none hover:bg-gray-200/50 cursor-default">
              File
            </DropdownMenu.Trigger>

            <DropdownContext.Provider value={{ closeMenu }}>
              <AnimatePresence>
                {open && (
                  <DropdownMenu.Portal forceMount>
                    <DropdownMenu.Content align="start" asChild>
                      <motion.div
                        initial="closed"
                        animate={controls}
                        exit="closed"
                        variants={{
                          open: {
                            opacity: 1,
                            transition: {
                              ease: "easeOut",
                              duration: 0.1,
                            },
                          },
                          closed: {
                            opacity: 0,
                            transition: {
                              ease: "easeIn",
                              duration: 0.1,
                            },
                          },
                        }}
                        className="bg-white/50 backdrop-blur rounded text-left p-2 shadow mt-1"
                      >
                        <Item onClick={() => setFoo("Clicked Item 1")}>
                          Item 1
                        </Item>
                        <Item onClick={() => setFoo("Clicked Item 2")}>
                          Item 2
                        </Item>
                        <Item onClick={() => alert("hi")}>Item 3</Item>
                      </motion.div>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                )}
              </AnimatePresence>
            </DropdownContext.Provider>
          </DropdownMenu.Root>
        </header>
        <div className="px-4 py-8">
          <p>{foo}</p>
        </div>
      </div>
    </div>
  );
}

const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));

function Item({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  let controls = useAnimationControls();
  let { closeMenu } = useContext(DropdownContext);

  return (
    <DropdownMenu.Item
      asChild
      onSelect={async (e) => {
        e.preventDefault();
        await controls.start({
          backgroundColor: white,
          color: gray500,
          transition: { duration: 0.04 },
        });
        await controls.start({
          backgroundColor: sky400,
          color: white,
          transition: { duration: 0.04 },
        });
        await sleep(0.075);
        await closeMenu();
        onClick();
      }}
      className="w-40 px-2 py-1.5 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none rounded"
    >
      <motion.div animate={controls}>{children}</motion.div>
    </DropdownMenu.Item>
  );
}

let gray500 = `#71717a`;
let white = `#ffffff`;
let sky400 = "#38bdf8";
