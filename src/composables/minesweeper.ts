import { BlockState } from '@/types'
import { ref, ToRef } from 'vue'
import { message } from './useElementMessage'

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

export const isDev = false
export class Game {
	state = ref<BlockState[][]>([])
	row: number
	column: number
	mineNumber: number
	flagNumber: ToRef<number> = ref(0)
	level: 1 | 2 | 3
	timer: NodeJS.Timeout = {} as NodeJS.Timeout
	gameStatus: ToRef<'play' | 'lose' | 'win'> = ref('play')

	constructor(row: number, column: number, level: 1 | 2 | 3) {
		this.row = row
		this.column = column
		this.level = level
		this.mineNumber = 0
		this.setLevel(this.level)
	}
	/**
	 * set game area size depend on the level.
	 */
	setLevel = (select: number) => {
		const setNum = []
		if (select === 1) {
			setNum.push(9, 9, 10)
		} else if (select === 2) {
			setNum.push(16, 16, 40)
		} else if (select === 3) {
			setNum.push(30, 19, 99)
		}
		this.row = setNum[0]
		this.column = setNum[1]
		this.mineNumber = setNum[2]
		this.reset()
	}

	reset = () => {
		if (this.gameStatus.value !== 'play') {
			this.gameStatus.value = 'play'
		}
		this.flagNumber.value = 0
		this.generateMine()
		this.calcAroundMine()
	}

	checkGameStatus = () => {
		if (this.gameStatus.value === 'lose') {
			message('you lose', 'warning')
		}
		if (this.gameStatus.value === 'win') {
			message('you win', 'success')
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
		this.state.value.forEach(row => {
			row.forEach(block => {
				if (block.mine) {
					block.arrondMine = -1
					return
				}
				block.arrondMine = 0
				direction.forEach(([dx, dy]) => {
					const x = block.x + dx
					const y = block.y + dy
					if (x < 0 || y < 0 || x >= this.column || y >= this.row) return
					if (block.arrondMine !== undefined && this.state.value[y][x].mine) {
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
		if (this.gameStatus.value !== 'play') return
		if (block.revealed || block.mark) return
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
	 * invoke the mark logic.
	 * @param block
	 */
	markMine = (block: BlockState) => {
		if (this.gameStatus.value !== 'play') return
		if (block.mark) {
			block.mark = false
			this.flagNumber.value--
		} else {
			if (this.flagNumber.value === this.mineNumber) {
				message('you cant mark more than mine number', 'warning')
				return
			}
			if (this.flagNumber.value + 1 === this.mineNumber) {
				this.flagNumber.value++
				this.checkWin()
				return
			}
			block.mark = true
			this.flagNumber.value++
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
			if (x < 0 || y < 0 || x >= this.column || y >= this.row) return
			const stateBlock = this.state.value[y][x]

			if (stateBlock !== undefined && stateBlock.arrondMine === 0) {
				if (!stateBlock.revealed && !stateBlock.mark) {
					nextReaveal.push(stateBlock)
					stateBlock.revealed = true
				}
			} else if (!stateBlock.mine && !stateBlock.mark) {
				stateBlock.revealed = true
			}
		})
		nextReaveal.forEach(block => {
			this.revealAroundZero(block)
		})
	}
	/**
	 * player click a mine, this function will be invoke.
	 * foreach all the block, if the block is a mine, the block will be reveal.
	 */
	loseLogic = () => {
		this.state.value.forEach(row => {
			row.forEach(block => {
				if (block.mine) {
					block.revealed = true
				}
			})
		})
		this.gameStatus.value = 'lose'
	}
	/**
	 * when the flag same as the mine, check if win.
	 */
	checkWin = () => {
		const markList: BlockState[] = []
		this.state.value.forEach(row => {
			row.forEach(block => {
				if (block.mark) {
					markList.push(block)
				}
			})
		})

		const isWin = markList.every(item => item.mine)
		if (isWin) {
			this.gameStatus.value = 'win'
		} else {
			message(
				'you spend all of the flag, but you didnt win, check carefully',
				'warning'
			)
		}
	}
}
