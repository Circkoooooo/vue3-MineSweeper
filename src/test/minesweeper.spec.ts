import { expect, test } from 'vitest'

import { Game } from '@/composables/minesweeper'

const items = [
	{ row: 9, column: 9, mineNum: 10 },
	{ row: 16, column: 16, mineNum: 40 },
	{ row: 30, column: 19, mineNum: 99 },
]
test('game init', () => {
	items.forEach((item, index) => {
		const game = new Game(index + 1)
		expect(game.row).toBe(item.row)
		expect(game.column).toBe(item.column)
		expect(game.mineNumber.value).toBe(item.mineNum)
	})
})


const game = new Game(1)
test('change level', () => {
	expect(game.row).toBe(items[0].row)
	expect(game.column).toBe(items[0].column)
	const willSet = 3
	game.setLevel(willSet)

	expect(game.row).toBe(items[willSet - 1].row)
	expect(game.column).toBe(items[willSet - 1].column)
	expect(game.mineNumber.value).toBe(items[willSet - 1].mineNum)
})
