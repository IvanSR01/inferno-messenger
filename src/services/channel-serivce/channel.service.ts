import { accessApi } from '@/$api/axios.api'
import { Channel, CreateChannel } from '@/shared/intreface/channel.interface'

class ChannelService {
	async getAll(): Promise<Channel[]> {
		const { data } = await accessApi<Channel[]>({
			method: 'GET',
			url: '/channel/all',
		})
		return data
	}

	async getSubChannels(id: number): Promise<Channel[]> {
		const { data } = await accessApi<Channel[]>({
			method: 'GET',
			url: `/channel/sub/${id}`,
		})
		return data
	}

	async getChannel(id: number): Promise<Channel> {
		const { data } = await accessApi<Channel>({
			method: 'GET',
			url: `/channel/one/${id}`,
		})
		return data
	}

	async createChannel(p: CreateChannel) {
		const { data } = await accessApi<Channel>({
			method: 'POST',
			url: '/channel/create',
			data: p,
		})

		return data
	}
}

export default new ChannelService()
