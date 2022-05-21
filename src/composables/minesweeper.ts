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
	mineNumber: number
	level: 1 | 2 | 3

	constructor(row: number, column: number, level: 1 | 2 | 3) {
		this.row = row
		this.column = column
		this.level = level
		this.mineNumber = 0
		this.setSizeByLevel()
		this.reset()
	}
	reset = () => {
		this.generateMine()
		this.calcAroundMine()
	}
	/**
	 * set game area size depend on the level.
	 */
	setSizeByLevel = () => {
		if (this.level === 1) {
			this.row = this.column = 9
			this.mineNumber = 10
		} else if (this.level === 2) {
			this.row = this.column = 16
			this.mineNumber = 40
		} else if (this.level === 3) {
			this.row = 16
			this.column = 30
			this.mineNumber = 99
		}
	}

	/**
	 * generate the mineBlock.
	 */
	generateMine = () => {
		const { row, column } = this
		this.state.value = Array.from({ length: row }, (_, y) =>
			Array.from(
				{ length: column },
				(_, x): BlockState => ({ x, y })
			)
		)
		let number = this.mineNumber
		while (number !== 0) {
			const x = Math.floor(Math.random() * this.row)
			const y = Math.floor(Math.random() * this.column)
			if (!this.state.value[x][y].mine) {
				this.state.value[x][y].mine = true
				number--
			}
		}
	}
	/**
	 * calculate the number around the mineBlock.
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
					if (
						x < 0 ||
						y < 0 ||
						x >= this.column ||
						y >= this.row
					)
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
	 * check the block is not a mine.
	 * @param block
	 */
	checkMine = (block: BlockState) => {
		if (block.mine) {
			alert('booooom!!')
		}
	}
}
