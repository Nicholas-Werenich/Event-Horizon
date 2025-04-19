
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevMonth}
        className="h-9 w-9"
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous month</span>
      </Button>
      <h2 className="text-xl font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={onNextMonth}
        className="h-9 w-9"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next month</span>
      </Button>
    </div>
  );
}
