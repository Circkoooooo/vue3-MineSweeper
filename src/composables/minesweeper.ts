import { BlockState } from '@/types'
import { ref } from 'vue'
const direction: Array<number[]> = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
]

export class Game {
	state = ref<BlockState[][]>([])
	row: number
	column: number

	constructor(row: number, column: number) {
		this.row = row
		this.column = column
		this.reset() 
	}
	reset = () => {
		this.generateMine()
		this.calcAroundMine()
	}

	/**
	 * 计算每个mine周围炸弹的个数
	 */
	calcAroundMine = () => {
		this.state.value.forEach((row) => {
			row.forEach((block) => {
				if (block.mine) {
					block.arrondMine = -1
					return
				}
				block.arrondMine = 0
				direction.forEach(([dx, dy]) => {
					const x = block.x + dx
					const y = block.y + dy
					if (x < 0 || y < 0 || x >= 9 || y >= 9)
						return
					if (
						block.arrondMine !==
							undefined &&
						this.state.value[y][x].mine
					) {
						block.arrondMine++
					}
				})
			})
		})
	}
	/**
	 * 生成游戏区域和炸弹
	 */
	generateMine = () => {
		const { row, column } = this
		this.state.value = Array.from({ length: row }, (_, y) =>
			Array.from(
				{ length: column },
				(_, x): BlockState => ({ x, y })
			)
		)
		for (const row of this.state.value) {
			for (const block of row) {
				block.mine = Math.random() < 0.1
			}
		}
	}
	/**
	 * 查看是否为炸弹
	 * @param block
	 */
	checkMine = (block: BlockState) => {
		if (block.mine) {
			alert('booooom!!')
		}
	}
}
