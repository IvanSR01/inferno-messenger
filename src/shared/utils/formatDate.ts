export const formatDate = (dateStr: string) =>
	new Date(dateStr).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
