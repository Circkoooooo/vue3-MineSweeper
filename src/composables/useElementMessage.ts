import { ElMessage } from 'element-plus'

export const message = (
	text: string,
	type: 'success' | 'warning' | 'info' | 'error'
) => {
	ElMessage({
		message: text,
		type: type,
	})
}
