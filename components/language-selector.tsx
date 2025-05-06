"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { languages } from "@/lib/languages"

interface LanguageSelectorProps {
  defaultValue?: string
}

export function LanguageSelector({ defaultValue = "plaintext" }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  return (
    <div className="space-y-2">
      <label htmlFor="language" className="text-sm font-medium">
        Language
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? languages.find((language) => language.id === value)?.name || "Select language" : "Select language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup className="max-h-60 overflow-y-auto">
                {languages.map((language) => (
                  <CommandItem
                    key={language.id}
                    value={language.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                      // Set the hidden input value for form submission
                      const input = document.getElementById("language") as HTMLInputElement
                      if (input) input.value = currentValue
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === language.id ? "opacity-100" : "opacity-0")} />
                    {language.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input type="hidden" name="language" id="language" value={value} />
    </div>
  )
}
