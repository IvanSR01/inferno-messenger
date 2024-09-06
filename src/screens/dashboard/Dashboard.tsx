import ChatsScreen from '@/components/dashboard/chats-screen/ChatsScreen'
import ControllersScreen from '@/components/dashboard/controllers-screen/ControllersScreen'
import { TypeGetPage } from '@/shared/types/pages.type'

const Pages = {
	chats: () => <ChatsScreen />,
	controllers: () => <ControllersScreen />,
}

export default ({ name }: { name: TypeGetPage<typeof Pages> }) => Pages[name]()
