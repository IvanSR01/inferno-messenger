import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import userService from '@/services/user-service/user.service'
import { User } from '@/shared/intreface/user.interface'
import { useAppDispatch, useAppSelector } from './useAction'
import { setMe } from '@/store/slice/me.slice'

export const useProfile = (): {
  user: User
  globalReState: (user: User) => void
} => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.me.me) // Убираем useState

  const { data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
    enabled: !profile,
  })

  useEffect(() => {
    if (user && !profile) {
      dispatch(setMe(user))
    }
  }, [user, profile, dispatch])

  const globalReState = (newUser: User) => {
    dispatch(setMe(newUser)) 
  }

  return useMemo(
    () => ({ user: profile || (user as User), globalReState }),
    [globalReState, profile, user]
  )
}
