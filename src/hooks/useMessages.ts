import { useProfile } from "@/hooks/useProfile";
import messageService from "@/services/message-service/message.service";
import userService from "@/services/user-service/user.service";
import { Message } from "@/shared/intreface/message.interface";
import { User } from "@/shared/intreface/user.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useCallback } from "react";

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
          messageService.emit("mark-as-read", {
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
      messageService.emit("get-messages", { chatId });
      messageService.on("get-messages", (messages: Message[]) => {
        setMessages(messages);
        if(!isNoRead) markAllMessagesAsRead(messages);
      });
    };

    fetchMessages();

    // Clean up listener on unmount
    return () => {
      messageService.off("get-messages");
    };
  }, [trigger, chatId]);

  return useMemo(() => ({ messages }), [messages]);
};

// Отправка сообщения
export const useSendMessage = () => {
  const client = useQueryClient();
  return (data: any) => {
    messageService.emit("send-message", data);
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
