
import { BlockState } from '@/types'
import { isDark } from '@/composables/dark'

export const getBlockClass = (block: BlockState) => {
	// dark
	if (isDark.value) {
		if (block.revealed) {
			return 'block_reavealed dark'
		} else {
			return 'block_unreavealed dark'
		}
	} else {
		if (block.revealed) {
			return 'block_reavealed light'
		} else {
			return 'block_unreavealed dark'
		}
	}
}

export const getBlockTextClass = (block: BlockState) => {
	const selectColor: Array<[number, string]> = [
		[1, '#3b82f6'],
		[2, '#03d679'],
		[3, '#f77601'],
		[4, '#fc2c20'],
		[5, '#d01907'],
	]
	let color = '#ffffff'

	if (block.mine && block.revealed) return '#dc2626'

	for (let i = 0; i < selectColor.length; i++) {
		if (selectColor[i][0] === block.arrondMine) {
			color = `${selectColor[i][1]}`
		}
	}
	return color
}
