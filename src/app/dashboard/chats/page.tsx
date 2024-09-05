import dynamic from 'next/dynamic'
import { FC } from 'react'

const Dashboard = dynamic(
	() => import('../../../screens/dashboard/Dashboard'),
	{
		ssr: false,
	}
)

export default function ChatPage() {
	return <Dashboard name="chats" />
}
