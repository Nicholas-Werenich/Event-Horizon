
import React from "react";
import { format } from "date-fns";
import { MapPin, Clock, CalendarIcon, X } from "lucide-react";

import { Event } from "@/contexts/EventContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EventDetailProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetail({ event, open, onOpenChange }: EventDetailProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>{format(event.date, "EEEE, MMMM d, yyyy")}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Details</h4>
            <p className="text-sm">{event.details}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Content</h4>
            <p className="text-sm whitespace-pre-wrap">{event.content}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
