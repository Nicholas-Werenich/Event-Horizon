
import React from "react";
import { format } from "date-fns";
import { CheckCircle, XCircle, LogOut } from "lucide-react";

import { useEvents } from "@/contexts/EventContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export function AdminPortal() {
  const { suggestions, approveSuggestion, rejectSuggestion, isAdmin, setIsAdmin } = useEvents();

  if (!isAdmin) return null;

  const pendingSuggestions = suggestions.filter(
    (suggestion) => suggestion.status === "pending"
  );
  
  const processedSuggestions = suggestions.filter(
    (suggestion) => suggestion.status !== "pending"
  );

  const handleApprove = (id: string) => {
    approveSuggestion(id);
    toast.success("Event suggestion approved");
  };

  const handleReject = (id: string) => {
    rejectSuggestion(id);
    toast.error("Event suggestion rejected");
  };

  const handleLogout = () => {
    setIsAdmin(false);
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Portal</h1>
        <Button 
          variant="destructive" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            Pending Suggestions 
            {pendingSuggestions.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingSuggestions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="processed">Processed Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <ScrollArea className="h-[600px] pr-4">
            {pendingSuggestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No pending suggestions
              </div>
            ) : (
              <div className="space-y-4">
                {pendingSuggestions.map((suggestion) => (
                  <Card key={suggestion.id}>
                    <CardHeader>
                      <CardTitle>{suggestion.title}</CardTitle>
                      <CardDescription>
                        {format(suggestion.date, "PPP")} at {suggestion.time} • {suggestion.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Details:</span> {suggestion.details}
                        </div>
                        <div>
                          <span className="font-medium">Content:</span> {suggestion.content}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleReject(suggestion.id)}
                            >
                              <XCircle className="h-5 w-5 text-red-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reject suggestion</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleApprove(suggestion.id)}
                            >
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Approve suggestion</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="processed">
          <ScrollArea className="h-[600px] pr-4">
            {processedSuggestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No processed suggestions
              </div>
            ) : (
              <div className="space-y-4">
                {processedSuggestions.map((suggestion) => (
                  <Card key={suggestion.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{suggestion.title}</CardTitle>
                        <Badge variant={suggestion.status === "approved" ? "default" : "destructive"}>
                          {suggestion.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {format(suggestion.date, "PPP")} at {suggestion.time} • {suggestion.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Details:</span> {suggestion.details}
                        </div>
                        <div>
                          <span className="font-medium">Content:</span> {suggestion.content}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

