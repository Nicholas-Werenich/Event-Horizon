
import React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isToday, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Event } from "@/contexts/EventContext";

interface MonthViewProps {
  currentMonth: Date;
  events: Event[];
  onSelectDay: (day: Date) => void;
}

export function MonthView({ currentMonth, events, onSelectDay }: MonthViewProps) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Create calendar days for the current month view
  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    // Generate header row with weekday names
    const weekdayHeader = (
      <div key="weekday-header" className="grid grid-cols-7 border-b">
        {weekdays.map((weekday, i) => (
          <div 
            key={`header-${i}`} 
            className="px-2 py-3 text-center border-r last:border-r-0 font-medium text-sm"
          >
            {weekday}
          </div>
        ))}
      </div>
    );
    rows.push(weekdayHeader);

    // Generate calendar grid
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const dayEvents = events.filter((event) => isSameDay(day, event.date));
        
        days.push(
          <div
            key={day.toString()}
            className={cn(
              "min-h-[120px] p-1 border-r border-b last:border-r-0 relative",
              !isSameMonth(day, monthStart) && "bg-gray-50",
              isToday(day) && "bg-blue-50",
              "cursor-pointer hover:bg-gray-100"
            )}
            onClick={() => onSelectDay(day)}
          >
            <div className={cn(
              "text-sm font-medium p-1",
              !isSameMonth(day, monthStart) && "text-gray-400"
            )}>
              {format(day, "d")}
            </div>
            <div className="mt-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="text-xs px-2 py-1 mb-1 rounded truncate"
                  style={{ backgroundColor: event.color || "#D3E4FD" }}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-gray-500 px-2">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return rows;
  };

  return <div className="border rounded-lg shadow overflow-hidden">{renderDays()}</div>;
}
