import parse from 'html-react-parser'
export const parseCode = (value: string) =>
	parse(value.replace('```', '<code').replace('```', '</code>'))
