
import React, { useState } from "react";
import { addMonths, subMonths, isSameDay } from "date-fns";
import { Plus, CalendarClock, LogIn } from "lucide-react";

import { useEvents, Event } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import { CalendarHeader } from "@/components/CalendarHeader";
import { MonthView } from "@/components/MonthView";
import { EventForm } from "@/components/EventForm";
import { EventDetail } from "@/components/EventDetail";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminPortal } from "@/components/AdminPortal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Calendar() {
  const { events, isAdmin } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleSelectDay = (day: Date) => {
    setSelectedDate(day);
    
    // Check if there are events on the selected day
    const eventsOnDay = events.filter((event) => isSameDay(event.date, day));
    
    if (eventsOnDay.length > 0) {
      setSelectedEvent(eventsOnDay[0]);
      setShowEventDetail(true);
    } else {
      setShowEventForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-6 w-6" />
            <h1 className="text-2xl font-bold">EVENT HORIZON</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAdminLogin(true)}
              className="flex items-center gap-1"
            >
              <LogIn className="h-4 w-4 mr-1" />
              Admin
            </Button>
            <Button 
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Event
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {isAdmin ? (
          <AdminPortal />
        ) : (
          <div className="max-w-5xl mx-auto">
            <CalendarHeader
              currentMonth={currentMonth}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
            <MonthView
              currentMonth={currentMonth}
              events={events}
              onSelectDay={handleSelectDay}
            />
            <p className="text-center mt-4 text-sm text-gray-500">
              Click on a day to view events or suggest a new one.
            </p>
          </div>
        )}
      </main>

      {/* Event Form Dialog */}
      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Suggest New Event</DialogTitle>
          </DialogHeader>
          <EventForm 
            onSuccess={() => setShowEventForm(false)}
            selectedDate={selectedDate || undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Event Detail Dialog */}
      <EventDetail 
        event={selectedEvent}
        open={showEventDetail}
        onOpenChange={setShowEventDetail}
      />

      {/* Admin Login Dialog */}
      <AdminLogin
        open={showAdminLogin}
        onOpenChange={setShowAdminLogin}
      />
    </div>
  );
}
