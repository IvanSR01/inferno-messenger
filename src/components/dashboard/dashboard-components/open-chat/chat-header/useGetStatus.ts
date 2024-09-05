import messageService from "@/services/message-service/message.service"
import { timeAgo } from "@/shared/utils/timeAgo"
import { useState } from "react"


export const useGetUserStatus = (userId: number): UserStatus | null => {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null)

  messageService.emit('user-status', { userId })

  messageService.on('user-status', (status) => setUserStatus({
		isOnline: status.isOnline,
		lastSeen: timeAgo(status.lastSeen),
	}))

  return userStatus
}

type UserStatus = {
  isOnline: boolean
  lastSeen: string
}


