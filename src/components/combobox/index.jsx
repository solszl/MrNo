import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckSmall, SortThree } from "@icon-park/react";
import { useState } from "react";

const frameworks = [
  { label: "自动选择", value: "auto" },
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const ComboBox = ({
  list = frameworks,
  commandPlaceholderText = "选择语言",
  emptyText = "没有语言被选中",
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value}
          <SortThree theme="outline" size="16" fill="#333" strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandInput placeholder={commandPlaceholderText} />
          <CommandEmpty>{emptyText}</CommandEmpty>
          <CommandGroup>
            {list.map((listItem) => (
              <CommandItem
                key={listItem.value}
                value={listItem.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                <CheckSmall
                  theme="outline"
                  size="24"
                  fill="#333"
                  strokeWidth={2}
                />
                {listItem.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
