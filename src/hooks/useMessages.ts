import { Message } from "@/shared/intreface/message.interface";
import { User } from "@/shared/intreface/user.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import socketService from "@/services/socket-service/socket.service";
// Получение сообщений

type UseMessage = {
  chatId: number;
  userId: number;
  trigger: any;
	isNoRead?: boolean;
};

export const useMessages = ({ trigger, chatId, userId, isNoRead }: UseMessage) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const markAllMessagesAsRead = useCallback(
    (messages: Message[]) => {
      messages.forEach((message, i) => {
        if (!message.user) return false;
        if (!message.isRead && message.user.id !== userId) {
          socketService.emit("mark-as-read", {
            messageId: message.id,
            chatId,
            isRefresh: i === messages.length - 1,
          });
        }
      });
    },
    [chatId, userId]
  );

  useEffect(() => {
    const fetchMessages = () => {
      socketService.emit("get-messages", { chatId });
      socketService.on("get-messages", (messages: Message[]) => {
        setMessages(messages);
        if(!isNoRead) markAllMessagesAsRead(messages);
      });
    };

    fetchMessages();

    // Clean up listener on unmount
    return () => {
      socketService.off("get-messages");
    };
  }, [trigger, chatId]);

  return useMemo(() => ({ messages }), [messages]);
};

// Отправка сообщения
export const useSendMessage = () => {
  const client = useQueryClient();
  return (data: any) => {
    socketService.emit("send-message", data);
    client.invalidateQueries({ queryKey: ["chats"] });
  };
};

// Проверка автора сообщения
type UseCheckAuthorMessage = {
  message: Message;
  user: User | undefined;
};

export const useCheckAuthorMessage = ({
  message,
  user,
}: UseCheckAuthorMessage) => {
  if (!message.user) return false;
	console.log(message.user, user)
  return message.user.id === user?.id;
};
