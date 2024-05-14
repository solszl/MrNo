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
import { cx } from "class-variance-authority";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";

const ComboBox = forwardRef(
  (
    {
      lngList,
      commandPlaceholderText = "选择语言",
      emptyText = "没有语言被选中",
      onItemSelect = () => {},
      defaultSelectValue = "en_us",
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      setCurrentValue: (val) => {
        setValue(val);
      },
    }));

    useEffect(() => {
      if (!value) {
        setValue(defaultSelectValue);
      }
    }, [lngList]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {t(`language.${value}`)}
            <SortThree theme="outline" size="16" fill="#333" strokeWidth={2} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[130px] p-0">
          <Command>
            <CommandInput placeholder={commandPlaceholderText} />
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {lngList.map((listItem) => (
                <CommandItem
                  key={listItem.value}
                  value={listItem.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    onItemSelect(currentValue);
                  }}
                >
                  <CheckSmall
                    theme="outline"
                    size="24"
                    fill="#333"
                    strokeWidth={2}
                    className={cx(
                      value === listItem.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {listItem.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

export default ComboBox;
