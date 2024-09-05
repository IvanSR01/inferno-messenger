import Input from '@/shared/ui/input/Input'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FormProps } from './Form-type'
import styles from './Form.module.scss'

const Form: FC<FormProps> = ({ inputData, onSubmit, isPending, name }) => {
	type ExtractNames<T> = T extends { name: infer U } ? U : never
	type InputNames = ExtractNames<(typeof inputData)[number]>

	type FormValues = {
		[key in InputNames]: string
	}

	const {
		register,
		handleSubmit,
		formState: { errors, submitCount },
	} = useForm<FormValues>()

	const [attempts, setAttempts] = useState(0)
	const [isFirstWarning, setIsFirstWaring] = useState(true)
	useEffect(() => {
		if (submitCount > 3 && attempts > 3) {
			if (isFirstWarning) {
				setIsFirstWaring(false)
				toast.warning('Too many attempts')
				const timer = setTimeout(() => {
					setAttempts(0)
					setIsFirstWaring(true)
				}, 5000)
				return () => clearTimeout(timer)
			}
		}
	}, [submitCount])

	const onSubmitForm = (data: FormValues) => {
		if (attempts > 3) {
			return
		}
		setAttempts(attempts + 1)
		onSubmit(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
			{inputData.map((input, i) => (
				<div key={i}>
					<Input
						type={input.type}
						placeholder={input.placeholder}
						pending={isPending}
						helperText={errors[input.name as InputNames]?.message}
						error={!!errors[input.name as InputNames]?.message}
						{...register(input.name as InputNames, {
							required: input.required && `This ${input.name} is required`,
						})}
					/>
				</div>
			))}
			<button className={styles.formButton} type='submit' disabled={isPending}>
				{name}
			</button>
		</form>
	)
}

export default Form
