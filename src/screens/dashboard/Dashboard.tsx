import ChatsScreen from '@/components/dashboard/chats-screen/ChatsScreen'
import { TypeGetPage } from '@/shared/types/pages.type'

const Pages = {
	chats: () => <ChatsScreen />,
}

export default ({ name }: { name: TypeGetPage<typeof Pages> }) => Pages[name]()
