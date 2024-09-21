'use client'
import Wrapper from '@/components/wrapper/Wrapper'
import { useAppDispatch, useAppSelector } from '@/hooks/useAction'
import Input from '@/shared/ui/input/Input'
import { setSearch } from '@/store/slice/search.slice'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import styles from './DashboardHeader.module.scss'
const DashboardNavBar = dynamic(() => import('../dashboard-nav-bar/DashboardNavBar'), {
  ssr: false,
});
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
