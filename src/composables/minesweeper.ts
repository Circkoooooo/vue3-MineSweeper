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
	gameStatus: 'play' | 'lose' | 'win' = 'play'

	constructor(row: number, column: number, level: 1 | 2 | 3) {
		this.row = row
		this.column = column
		this.level = level
		this.mineNumber = 0
		this.setLevel(this.level)
	}
	reset = () => {
		if (this.gameStatus !== 'play') {
			this.gameStatus = 'play'
		}
		this.generateMine()
		this.calcAroundMine()
	}
	/**
	 * set game area size depend on the level.
	 */
	setLevel = (select: number) => {
		if (select === 1) {
			this.row = this.column = 9
			this.mineNumber = 10
		} else if (select === 2) {
			this.row = this.column = 16
			this.mineNumber = 40
		} else if (select === 3) {
			this.row = 30
			this.column = 16
			this.mineNumber = 99
		}
		this.reset()
	}

	/**
	 * generate the mineBlock.
	 */
	generateMine = () => {
		const { row, column } = this
		this.state.value = Array.from({ length: row }, (_, y) =>
			Array.from(
				{ length: column },
				(_, x): BlockState => ({
					x,
					y,
					revealed: false,
				})
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
	 * click a block, this function will be invoke.
	 * if the block is a mine, the loseLogic() will be invoke.
	 * if the gameStatus is not play status, it will not do anything.
	 * if the block was revealed, it will not do anyting.
	 * @param block
	 */
	clickBlock = async (block: BlockState) => {
		if (this.gameStatus !== 'play') return
		if (block.revealed) return
		block.revealed = true
		if (block.mine) {
			this.loseLogic()
		} else {
			if (block.arrondMine === 0) {
				this.revealAroundZero(block)
			}
		}
	}
	/**
	 * reveal all the block which its aroundMineNumber is 0.
	 * @param block
	 */
	revealAroundZero = (block: BlockState) => {
		const nextReaveal: BlockState[] = [] as BlockState[]
		direction.forEach(([dx, dy]) => {
			const x = dx + block.x
			const y = dy + block.y
			if (x < 0 || y < 0 || x >= this.column || y >= this.row)
				return
			const stateBlock = this.state.value[y][x]

			if (
				stateBlock !== undefined &&
				stateBlock.arrondMine === 0
			) {
				if (!stateBlock.revealed) {
					nextReaveal.push(stateBlock)
					stateBlock.revealed = true
				}
			} else if (!stateBlock.mine) {
				stateBlock.revealed = true
			}
		})
		nextReaveal.forEach((block) => {
			this.revealAroundZero(block)
		})
	}
	/**
	 * player click a mine, this function will be invoke.
	 * foreach all the block, if the block is a mine, the block will be reveal.
	 */
	loseLogic = () => {
		this.state.value.forEach((row) => {
			row.forEach((block) => {
				if (block.mine) {
					block.revealed = true
				}
			})
		})
		this.gameStatus = 'lose'
		setTimeout(() => {
			alert('you lose!')
		}, 0)
	}
}

const getBlockTextColor = (block: BlockState) => {
	const selectColor: Array<[number, string]> = [
		[1, '#3b82f6'],
		[2, '#03d679'],
		[3, '#f77601'],
		[4, '#fc2c20'],
		[5, '#d01907'],
	]
	let color = '#fff'

	if (block.mine && block.revealed) return 'white'

	for (let i = 0; i < selectColor.length; i++) {
		if (selectColor[i][0] === block.arrondMine) {
			color = `${selectColor[i][1]}`
		}
	}
	return color
}

const getBlockBackground = (block: BlockState) => {
	if (block.mine && block.revealed) return '#812b2b'
	if (!block.revealed) {
		return '#1b1c1d'
	} else {
		return '#000'
	}
}
const getBlockBorder = (block: BlockState) => {
	if (block.mine && block.revealed) {
		return '1px solid #812b2b'
	} else {
		return '1px solid #282a2c'
	}
}
export { getBlockBackground, getBlockTextColor, getBlockBorder }
