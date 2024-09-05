import LoginScreen from '@/components/auth/login-screen/LoginScreen'
import { inputDataLogin, inputDataRegister } from './auth.data'
import RegisterScreen from '@/components/auth/register-screen/RegisterScreen'

const Pages = {
	login: () => <LoginScreen inputData={inputDataLogin} />,
	register: () => <RegisterScreen inputData={inputDataRegister} />,
}
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ name }: { name: keyof typeof Pages }) => Pages[name]()
