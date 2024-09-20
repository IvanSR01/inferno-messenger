'use client'
import { FC } from 'react'
import styles from './DashboardHeader.module.scss'
import Wrapper from '@/components/wrapper/Wrapper'
import Input from '@/shared/ui/input/Input'
import DashboardNavBar from '../dashboard-nav-bar/DashboardNavBar'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/hooks/useAction'
import { setSearch } from '@/store/slice/search.slice'

const DashboardHeader: FC = () => {
	const dispatch = useAppDispatch()
	const { search } = useAppSelector((state) => state.search)
	return (
		<div className={styles.header}>
			<Wrapper>
				<div className={styles['header-content']}>
					<div className={styles.search}>
						<Input
							placeholder="Search..."
							icon={<DashboardNavBar />}
							value={search}
							onChange={(e: any) => dispatch(setSearch(e.target.value))}
						/>
					</div>
				</div>
			</Wrapper>
		</div>
	)
}
export default DashboardHeader
