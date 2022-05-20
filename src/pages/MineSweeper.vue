<script lang="ts" setup>
import { reactive } from 'vue'

import type { BlockState } from '@/types'
import MineButton from '@/components/MineButton.vue'

const state = reactive(
	Array.from({ length: 10 }, (_, y) =>
		Array.from({ length: 10 }, (_, x): BlockState => ({ x, y })))
)

const direction: Array<number[]> = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
/**
 * 生成一些炸弹
 */
const generateMine = () => {
	for (const row of state) {
		for (const block of row) {
			block.mine = Math.random() < 0.3
		}
	}
}
/**
 * 查看是否为炸弹
 * @param block 
 */
const checkMine = (block: BlockState) => {
	if (block.mine) {
		alert('booooom!!')

	}
}

/**
 * 计算每个mine周围炸弹的个数
 */
const calcAroundMine = () => {

	state.forEach(row => {
		row.forEach(block => {
			if (block.mine) {
				block.arrondMine = -1
				return
			}
			block.arrondMine = 0
			direction.forEach(([dx, dy]) => {
				const x = block.x + dx
				const y = block.y + dy
				if (x < 0 || y < 0 || x >= 10 || y >= 10) return
				if (block.arrondMine !== undefined && state[y][x].mine) {
					block.arrondMine++
				}
			})
		})

	})
}

generateMine()
calcAroundMine()

</script>

<template>
	<div>
		Mine Sweeper
		<div w-full overflow-auto mt-5>
			<div v-for="row, y in state" :key="y" flex="~" items-center justify-center w-max m-auto>
				<MineButton v-for="block, x in row" :block="block" :key="x" @click="checkMine(block)" border-red />
			</div>
		</div>
	</div>
</template >