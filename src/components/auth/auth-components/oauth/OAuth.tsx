import { FC } from 'react'
import { SlSocialVkontakte } from 'react-icons/sl'
import styles from './OAuth.module.scss'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
const oauthData = [
	{
		name: 'Github',
		Icon: () => <FaGithub />,
		link: `${process.env.NEST_PUBLIC_API_URL}/auth/github`,
	},
	{
		name: 'Google',
		Icon: () => <FaGoogle />,
		link: `${process.env.NEST_PUBLIC_API_URL}/auth/google`,
	},
	{
		name: 'Vk',
		Icon: () => <SlSocialVkontakte />,
		link: `${process.env.NEST_PUBLIC_API_URL}/auth/vk`,
	},
]

const OAuth: FC = () => {
	return (
		<div className={styles.oauth}>
			{oauthData.map(({ link, Icon, name }, i) => (
				<a key={i} href={'http://localhost:4200/api/auth/github'}>
					<Icon />
					<p>{name}</p>
				</a>
			))}
		</div>
	)
}

export default OAuth
