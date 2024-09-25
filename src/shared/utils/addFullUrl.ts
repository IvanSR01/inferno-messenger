export const addFullUrl = (url: string) => {
	return url.replaceAll(
		'/uploads',
		`${process.env.NEST_PUBLIC_API_URL}/uploads`
	)
}
