"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  id?: string;
  selectedDate?: Date;
  onDateSelect?: (date: Date | undefined) => void;
}

export function DatePicker({ selectedDate, onDateSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
}
