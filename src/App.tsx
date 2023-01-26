import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode, useState } from "react";

export default function App() {
  let [text, setText] = useState("Select an item");

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="max-w-sm mx-auto bg-white border border-gray-300 rounded-md overflow-hidden w-full">
        <header className="border-b border-gray-100 p-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="px-4 py-1 rounded select-none data-[state=open]:bg-gray-200/75 focus-visible:outline-none hover:bg-gray-200/50 cursor-default">
              File
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                className="bg-white/50 backdrop-blur rounded text-left p-2 shadow mt-1"
              >
                <Item onClick={() => setText("Clicked Item 1")}>Item 1</Item>
                <Item onClick={() => setText("Clicked Item 2")}>Item 2</Item>
                <Item onClick={() => alert("hi")}>Item 3</Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </header>
        <div className="px-6 py-8">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

function Item({
  children,
  onClick = () => {},
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <DropdownMenu.Item
      onSelect={onClick}
      className="text-gray-700 w-40 px-2 py-1.5 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none select-none rounded"
    >
      {children}
    </DropdownMenu.Item>
  );
}
