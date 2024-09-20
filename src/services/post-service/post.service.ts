import { accessApi } from '@/$api/axios.api'
import { Post } from '@/shared/intreface/post.interface'

class PostService {
	async getPosts(id: number): Promise<Post[]> {
		const { data } = await accessApi<Post[]>({
			method: 'GET',
			url: `/post/all/channel/${id}`,
		})
		return data
	}
	async createPost(content: string, channelId: number): Promise<Post> {
		const { data } = await accessApi<Post>({
			method: 'POST',
			url: '/post/create	',
			data: {
				content,
				channelId,
			},
		})
		return data
	}
}

export default new PostService()
