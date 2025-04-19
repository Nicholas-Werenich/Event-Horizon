
import React from 'react';
import { format } from 'date-fns';
import { useEvents, Event } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface UpcomingEventsProps {
  onEventClick: (event: Event) => void;
}

export function UpcomingEvents({ onEventClick }: UpcomingEventsProps) {
  const { events } = useEvents();
  
  // Sort events by date and time
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${format(a.date, 'yyyy-MM-dd')} ${a.time.split(' - ')[0]}`);
    const dateB = new Date(`${format(b.date, 'yyyy-MM-dd')} ${b.time.split(' - ')[0]}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="w-80 border-l h-full p-4 space-y-4">
      <h2 className="text-lg font-semibold">Upcoming Events</h2>
      <div className="space-y-3">
        {sortedEvents.map((event) => (
          <Button
            key={event.id}
            variant="ghost"
            className="w-full justify-start text-left p-3 h-auto"
            onClick={() => onEventClick(event)}
          >
            <div className="space-y-1">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(event.date, 'MMM dd, yyyy')}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
