import { useEffect, useMemo, useState } from 'react';
import { timeAgo } from '@/shared/utils/timeAgo';
import socketService from '@/services/socket-service/socket.service';

export const useGetUserStatus = (userId: number | null): UserStatus | null => {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);

  useEffect(() => {
    if (!userId) return; 

    const updateStatus = (status: any) => {
      setUserStatus({
        isOnline: status.isOnline,
        lastSeen: timeAgo(status.lastSeen),
      });
    };

    socketService.emit('user-status', { userId });

    socketService.on('user-status', updateStatus);

    return () => {
      socketService.off('user-status');
    };
  }, [userId]);

  return useMemo(() => userStatus, [userStatus]);
};

type UserStatus = {
  isOnline: boolean;
  lastSeen: string;
};
