import React from 'react';
import { Phone, ChevronDown, CheckCircle2, RefreshCw } from 'lucide-react';
import { useWidgetSoftphone } from '@/contexts/WidgetSoftphoneContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function WidgetNumberSwitcher() {
  const { userNumbers, selectedNumber, setSelectedNumber, loadingNumbers } = useWidgetSoftphone();

  if (loadingNumbers) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span>Loading numbers...</span>
      </div>
    );
  }

  if (userNumbers.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="h-4 w-4" />
        <span>No phone numbers assigned</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-[200px]">
          <Phone className="h-4 w-4" />
          <div className="flex-1 text-left">
            {selectedNumber ? (
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {selectedNumber.formatted_number}
                </span>
                {selectedNumber.friendly_name && (
                  <span className="text-xs text-muted-foreground">
                    {selectedNumber.friendly_name}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm">Select Number</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[250px]">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          Your Phone Numbers ({userNumbers.length})
        </div>
        <DropdownMenuSeparator />
        {userNumbers.map((number) => (
          <DropdownMenuItem
            key={number.id}
            onClick={() => setSelectedNumber(number)}
            className="flex items-start gap-2 cursor-pointer"
          >
            <div className="flex items-center justify-center w-4 h-4 mt-0.5">
              {selectedNumber?.id === number.id && (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">
                {number.formatted_number}
              </div>
              {number.friendly_name && (
                <div className="text-xs text-muted-foreground">
                  {number.friendly_name}
                </div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
