import channelService from "@/services/channel-serivce/channel.service"
import { useQuery } from "@tanstack/react-query"

export const useChannels = () => {
	return useQuery({
		queryKey: ["channels"],
		queryFn: () => channelService.getAll(),
	}).data
}