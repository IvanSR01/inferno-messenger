import { FC } from 'react'
import styles from './DashboardHeader.module.scss'
import Wrapper from '@/components/wrapper/Wrapper'
import Input from '@/shared/ui/input/Input'
import DashboardNavBar from '../dashboard-nav-bar/DashboardNavBar'
import { FaSearch } from 'react-icons/fa'

const DashboardHeader: FC = () => {
	return (
		<div className={styles.header}>
			<Wrapper>
				<div className={styles['header-content']}>
					<h3>ZED - messenger</h3>
					<div className={styles.search}>
						<Input placeholder="Find a user or chat" icon={<FaSearch className={styles['search-icon']}/>} />
					</div>
					<DashboardNavBar/>
				</div>
			</Wrapper>
		</div>
	)
}
export default DashboardHeader
