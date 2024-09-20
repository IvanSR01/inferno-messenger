/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'

export const useFormController = <T>(
	initialData: T
): {
	data: T
	handlerChange: (value: string, name: keyof T) => void
} => {
	const [data, setData] = useState<T>(initialData)

	const handlerChange = (value: string, name: keyof T): void => {
		setData({ ...data, [name]: value })
	}

	return useMemo(() => ({ data, handlerChange }), [data, handlerChange])
}
