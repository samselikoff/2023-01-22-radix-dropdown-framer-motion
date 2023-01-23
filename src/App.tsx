import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function App() {
  let [open, setOpen] = useState(false);
  let [foo, setFoo] = useState("");
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
      <div className="max-w-sm mx-auto bg-white shadow p-8 rounded w-full">
        <div className="mb-8">
          <p>Foo is {foo}</p>
        </div>
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger className="bg-gray-200 px-3 py-1 rounded select-none">
            Menu
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal forceMount>
            <AnimatePresence>
              {open && (
                <DropdownMenu.Content asChild>
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
                          duration: 0.15,
                        },
                      },
                    }}
                    className="bg-gray-100 rounded text-left p-1.5 shadow-sm mt-2 border border-gray-300"
                  >
                    <Item
                      onClick={() => setFoo("item 1")}
                      closeMenu={closeMenu}
                    >
                      Item 1
                    </Item>
                    <Item
                      onClick={() => setFoo("Item 2")}
                      closeMenu={closeMenu}
                    >
                      Item 2
                    </Item>
                    <Item closeMenu={closeMenu}>Item 3</Item>
                  </motion.div>
                </DropdownMenu.Content>
              )}
            </AnimatePresence>
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
  closeMenu,
  onClick = () => {},
}: {
  children: React.ReactNode;
  closeMenu: () => void;
  onClick?: () => void;
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
          transition: { duration: 0.06 },
        });
        await controls.start({
          backgroundColor: "rgb(14,165,233)",
          color: "rgb(255,255,255)",
          transition: { duration: 0.06 },
        });
        await sleep(0.05);
        await closeMenu();
        onClick();
      }}
      className="w-40 px-2 py-2 data-[highlighted]:bg-sky-500 data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none cursor-pointer rounded"
    >
      <motion.div animate={controls}>{children}</motion.div>
    </DropdownMenu.Item>
  );
}
