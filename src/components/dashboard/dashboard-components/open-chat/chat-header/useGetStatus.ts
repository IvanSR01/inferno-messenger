import { useEffect, useState } from 'react';
import messageService from '@/services/message-service/message.service';
import { timeAgo } from '@/shared/utils/timeAgo';

export const useGetUserStatus = (userId: number): UserStatus | null => {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  useEffect(() => {
    // Функция для обновления статуса пользователя
    const updateStatus = (status: any) => {
      setUserStatus({
        isOnline: status.isOnline,
        lastSeen: timeAgo(status.lastSeen),
      });
    };

    // Отправляем запрос на получение статуса пользователя
    messageService.emit('user-status', { userId });

    // Подписываемся на обновления статуса пользователя
    messageService.on('user-status', updateStatus);

    // Очистка подписок при размонтировании компонента
    return () => {
      messageService.off('user-status');
    };
  }, [userId]); // Зависимость от userId для обновления при изменении

  // Логирование можно удалить или оставить только для отладки
  useEffect(() => {
    console.log(userStatus);
  }, [userStatus]);

  return userStatus;
}

type UserStatus = {
  isOnline: boolean;
  lastSeen: string;
};
