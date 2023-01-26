import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export default function App() {
  let [open, setOpen] = useState(false);
  let [text, setText] = useState("Select an item");
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
                      <Item
                        onClick={() => setText("Clicked Item 1")}
                        closeMenu={closeMenu}
                      >
                        Item 1
                      </Item>
                      <Item
                        onClick={() => setText("Clicked Item 2")}
                        closeMenu={closeMenu}
                      >
                        Item 2
                      </Item>
                      <Item onClick={() => alert("hi")} closeMenu={closeMenu}>
                        Item 3
                      </Item>
                    </motion.div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              )}
            </AnimatePresence>
          </DropdownMenu.Root>
        </header>
        <div className="px-6 py-8">
          <p>{text}</p>
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
  closeMenu,
}: {
  children: ReactNode;
  onClick?: () => void;
  closeMenu: () => void;
}) {
  let controls = useAnimationControls();

  return (
    <DropdownMenu.Item
      asChild
      onSelect={async (e) => {
        e.preventDefault();
        await controls.start({
          backgroundColor: "var(--white)",
          color: "var(--gray-700)",
          transition: { duration: 0.04 },
        });
        await controls.start({
          backgroundColor: "var(--sky-400)",
          color: "var(--white)",
          transition: { duration: 0.04 },
        });
        await sleep(0.075);
        await closeMenu();
        onClick();
      }}
      className="text-gray-700 w-40 px-2 py-1.5 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none rounded"
    >
      <motion.div animate={controls}>{children}</motion.div>
    </DropdownMenu.Item>
  );
}
