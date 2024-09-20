import { FC, Fragment, useState } from 'react'
import styles from './Post.module.scss'
import { Post } from '@/shared/intreface/post.interface'
import parse from 'html-react-parser'
import { addFullUrl } from '@/shared/utils/addFullUrl'
import { formatDate } from '@/shared/utils/formatDate'
import { GrFormView } from 'react-icons/gr'
import ContentModal from '@/shared/ui/content-modal/ContentModal'
import Audio from '@/components/audio/Audio'

interface Props {
	post: Post
}

const PostUi: FC<Props> = ({ post }) => {
	const content: string[] = post.content.split('\n') as string[]

	const mediaContent = content.filter(
		(item) =>
			item.includes('<img') ||
			item.includes('<video') ||
			item.includes('<audio')
	)
	const [show, setShow] = useState('')
	const text = content
		.filter((item) => !item.includes('<img') && !item.includes('<video'))
		.toString()
	const parseContent = (item: string) =>
		parse(addFullUrl(item as string), {
			replace: (domNode: any) => {
				if (
					domNode.name === 'audio' &&
					domNode.attribs &&
					domNode.attribs.src
				) {
					return <Audio src={domNode.attribs.src as string} />
				}
			},
		})
	return (
		<div className={styles.wrapper}>
			<div className={styles.post}>
				<div className={styles['post-content']}>
					<div className={styles.media}>
						{mediaContent.map((item, i) => (
							<Fragment key={i}>
								<span onClick={() => setShow(item)}>
									{item && parse(addFullUrl(item))}
								</span>
								<ContentModal
									showModal={item === show}
									setShowModal={() => setShow('')}
								>
									{parseContent(item)}
								</ContentModal>
							</Fragment>
						))}
					</div>
					<div className={styles.text}>{parse(text)}</div>
				</div>
				<div className={styles.detalis}>
					{!!post.view && (
						<div className={styles.view}>
							<div>{post.view}</div>
							<GrFormView />
						</div>
					)}
					{formatDate(post?.sendTime as string)}
				</div>
			</div>
		</div>
	)
}

export default PostUi
