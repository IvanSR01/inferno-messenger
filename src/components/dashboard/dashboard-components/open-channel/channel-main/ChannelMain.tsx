/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useRef } from 'react'
import styles from './ChannelMain.module.scss'
import { useProfile } from '@/hooks/useProfile'
import { useMutation, useQuery } from '@tanstack/react-query'
import postService from '@/services/post-service/post.service'
import PostUi from './post/Post'
import { Channel } from '@/shared/intreface/channel.interface'
import Send from '../../send-message/Send'
import { toast } from 'react-toastify'
import { useError } from '@/hooks/useError'
import Background from '../../background/Background'
import MessageUI from '../../message/Message'
import { Message } from '@/shared/intreface/message.interface'

interface Props {
	chat: Channel
}

const ChannelMain: FC<Props> = ({ chat }) => {
	const me = useProfile()
	const { data: posts, refetch } = useQuery({
		queryKey: ['posts', chat.id],
		queryFn: () => postService.getPosts(chat.id),
	})
	const postContainRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (postContainRef.current) {
			postContainRef.current.scrollTop = postContainRef.current.scrollHeight
		}
	}, [posts])
	const { mutate } = useMutation({
		mutationFn: (p: string) => postService.createPost(p, chat.id),
		onSuccess: () => refetch(),
		onError: (err) => toast.error(useError(err)),
	})
	const handleSendMessage = (content: string) => {
		mutate(content)
	}
	return (
		<main className={styles.main}>
			{posts?.length ? (
				<div className={styles.posts} ref={postContainRef}>
					<Background src={chat?.background} />
					{posts?.map((post) => (
						<PostUi key={post.id} post={post}/>
					))}
				</div>
			) : (
				<div className={styles.noPost}>No posts</div>
			)}
			{chat?.author?.id === me?.id ? (
				<Send handleSend={handleSendMessage} contentType="post" />
			) : (
				<p>Подписатся</p>
			)}
		</main>
	)
}
export default ChannelMain
