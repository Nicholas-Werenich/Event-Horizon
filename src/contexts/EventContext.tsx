
import React, { createContext, useState, useContext, ReactNode } from "react";
import { addDays } from "date-fns";

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  details: string;
  content: string;
  color?: string;
}

export interface EventSuggestion extends Omit<Event, "id"> {
  id: string;
  status: "pending" | "approved" | "rejected";
}

interface EventContextType {
  events: Event[];
  suggestions: EventSuggestion[];
  addEvent: (event: Omit<Event, "id">) => void;
  addSuggestion: (suggestion: Omit<EventSuggestion, "id" | "status">) => void;
  approveSuggestion: (id: string) => void;
  rejectSuggestion: (id: string) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    date: new Date(2025, 3, 21),
    time: "10:00 AM - 11:00 AM",
    location: "Conference Room A",
    details: "Weekly team sync",
    content: "Discuss project progress and upcoming deadlines.",
    color: "#D3E4FD",
  },
  {
    id: "2",
    title: "Lunch & Learn",
    date: new Date(2025, 3, 23),
    time: "12:30 PM - 2:00 PM",
    location: "Cafeteria",
    details: "Tech talk series",
    content: "Introduction to GraphQL and modern API design.",
    color: "#F8D0C8",
  },
];

const initialSuggestions: EventSuggestion[] = [
  {
    id: "s1",
    title: "Community Workshop",
    date: new Date(2025, 3, 28),
    time: "3:00 PM - 5:00 PM",
    location: "Community Center",
    details: "Open to public",
    content: "Learn about sustainable gardening practices for urban environments.",
    status: "pending",
    color: "#D8F0E0",
  },
];

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [suggestions, setSuggestions] = useState<EventSuggestion[]>(initialSuggestions);
  const [isAdmin, setIsAdmin] = useState(false);

  const addEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: `e${Date.now()}`,
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const addSuggestion = (suggestionData: Omit<EventSuggestion, "id" | "status">) => {
    const newSuggestion: EventSuggestion = {
      ...suggestionData,
      id: `s${Date.now()}`,
      status: "pending",
    };
    setSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion]);
  };

  const approveSuggestion = (id: string) => {
    const suggestion = suggestions.find((s) => s.id === id);
    if (suggestion) {
      // Add to events when approved
      const newEvent: Event = {
        id: `e${Date.now()}`,
        title: suggestion.title,
        date: suggestion.date,
        time: suggestion.time,
        location: suggestion.location,
        details: suggestion.details,
        content: suggestion.content,
        color: suggestion.color,
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
      
      // Update suggestion status
      setSuggestions(
        suggestions.map((s) =>
          s.id === id ? { ...s, status: "approved" as const } : s
        )
      );
    }
  };

  const rejectSuggestion = (id: string) => {
    setSuggestions(
      suggestions.map((s) =>
        s.id === id ? { ...s, status: "rejected" as const } : s
      )
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        suggestions,
        addEvent,
        addSuggestion,
        approveSuggestion,
        rejectSuggestion,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
