import React, { useState } from "react";
import { addMonths, subMonths, isSameDay } from "date-fns";
import { Plus, CalendarClock, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { useEvents, Event } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import { CalendarHeader } from "@/components/CalendarHeader";
import { MonthView } from "@/components/MonthView";
import { EventForm } from "@/components/EventForm";
import { EventDetail } from "@/components/EventDetail";
import { AdminLogin } from "@/components/AdminLogin";
import { AdminPortal } from "@/components/AdminPortal";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Calendar() {
  const { events, isAdmin, setIsAdmin } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleSelectDay = (day: Date) => {
    setSelectedEvent(null);
    setShowEventDetail(false);
    setShowEventForm(true);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminLogin(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <CalendarClock className="h-6 w-6" />
            <h1 className="text-2xl font-bold">EVENT HORIZON</h1>
          </Link>
          <div className="flex gap-2">
            {isAdmin ? (
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setShowAdminLogin(true)}
                className="flex items-center gap-1"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Admin
              </Button>
            )}
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
          <div className="flex max-w-[1500px] mx-auto">
            <div className="flex-1">
              <CalendarHeader
                currentMonth={currentMonth}
                onPrevMonth={() => setCurrentMonth(subMonths(currentMonth, 1))}
                onNextMonth={() => setCurrentMonth(addMonths(currentMonth, 1))}
              />
              <MonthView
                currentMonth={currentMonth}
                events={events}
                onSelectDay={handleSelectDay}
                onEventClick={handleEventClick}
              />
            </div>
            <UpcomingEvents onEventClick={handleEventClick} />
          </div>
        )}
      </main>

      {/* Event Form Dialog */}
      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Suggest New Event</DialogTitle>
          </DialogHeader>
          <EventForm onSuccess={() => setShowEventForm(false)} />
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
