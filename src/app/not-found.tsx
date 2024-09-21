import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const NotFound = dynamic(() => import('../screens/not-found/NotFound'), {
	ssr: false,
})

const page: NextPage = () => {
	return <NotFound />
}
export default page
