import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export default function App() {
  let [text, setText] = useState("Select an item");
  let [open, setOpen] = useState(false);
  let controls = useAnimationControls();

  async function closeMenu() {
    await controls.start("closed");
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      controls.start("open");
    }
  }, [controls, open]);

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-sm mx-auto bg-white border-gray-300 rounded-md overflow-hidden w-full">
        <header className="border-b border-gray-100 p-2">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger className="px-4 rounded select-none data-[state=open]:bg-gray-200/75 focus-visible:outline-none hover:bg-gray-200/50 cursor-default text-2xl">
              
            </DropdownMenu.Trigger>

            <AnimatePresence>
              {open && (
                <DropdownMenu.Portal forceMount>
                  <DropdownMenu.Content
                    align="start"
                    className="bg-white/50 backdrop-blur overflow-hidden rounded text-left shadow mt-1"
                    asChild
                  >
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
                            duration: 0.2,
                          },
                        },
                      }}
                    >
                      <div className="p-2">
                        <Item
                          closeMenu={closeMenu}
                          onSelect={() => setText("Clicked Item 1")}
                        >
                          Item 1
                        </Item>
                        <Item
                          closeMenu={closeMenu}
                          onSelect={() => setText("Clicked Item 2")}
                        >
                          Item 2
                        </Item>
                        <Item
                          closeMenu={closeMenu}
                          onSelect={() => alert(";)")}
                        >
                          Item 3
                        </Item>
                      </div>
                    </motion.div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              )}
            </AnimatePresence>
          </DropdownMenu.Root>
        </header>
        <div className="px-6 py-8 text-right">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

function Item({
  children,
  onSelect = () => {},
  closeMenu,
}: {
  children: ReactNode;
  onSelect?: () => void;
  closeMenu: () => void;
}) {
  let controls = useAnimationControls();

  return (
    <DropdownMenu.Item
      onSelect={async (e) => {
        e.preventDefault();
        await controls.start({
          backgroundColor: "rgb(56 189 248 / 0)",
          // backgroundColor: "var(--sky-400) / 0)",
          // color: "rgb(64 64 64 / 1)",
          color: "rgb(var(--gray-700) / 1)",
          transition: { duration: 0.05 },
        });
        await controls.start({
          backgroundColor: "rgb(56 189 248 / 1)",
          // backgroundColor: "rgb(var(--sky-400) / 1)",
          color: "rgb(255 255 255 / 1)",
          // color: "rgb(var(--white) / 1)",
          transition: { duration: 0.05 },
        });
        await sleep(0.075);
        await closeMenu();
        onSelect();
      }}
      asChild
    >
      <motion.div
        animate={controls}
        className="text-gray-700 w-40 px-2 py-1.5 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none rounded cursor-default"
        // className="text-gray-700 w-40 px-2 py-1.5 data-[highlighted]:bg-[rgb(var(--sky-400)_/_1)] data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none rounded cursor-default"
      >
        {children}
      </motion.div>
    </DropdownMenu.Item>
  );
}

const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));
