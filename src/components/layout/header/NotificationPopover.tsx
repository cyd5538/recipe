// components/NotificationPopover.tsx
"use client";

import { BellIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: 1, message: "새로운 댓글이 달렸습니다." },
  { id: 2, message: "팔로워가 추가되었습니다." },
  { id: 3, message: "게시물이 좋아요를 받았습니다." },
  { id: 4, message: "게시물이 좋아요를 받았습니다." },
  { id: 5, message: "게시물이 좋아요를 받았습니다." },
];

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <BellIcon className="h-7 w-7" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs rounded-full flex justify-center items-center">
              {notifications.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 space-y-1">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">알림이 없습니다.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="text-sm rounded-md hover:bg-accent p-2 transition-colors"
            >
              {item.message}
            </div>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
