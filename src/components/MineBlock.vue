<script lang="ts" setup>
import { getBlockBackground, getBlockTextColor, getBlockBorder } from '@/composables/minesweeper'

import type { BlockState } from '@/types'
defineProps<{ block: BlockState }>()
const emit = defineEmits(['clickBlock'])

</script>

<template>
	<button m="1px" flex="~" items-center justify-center min-w-9 min-h-9 fw="bold" :style="{
		background: getBlockBackground(block), color: getBlockTextColor(block), border: getBlockBorder(block)
	}" @click="emit('clickBlock')">
		<div v-if="!block.revealed"></div>
		<div v-if="block.revealed">
			<span v-if="block.mine" i-mdi-mine></span>
			<span v-else>{{ block.arrondMine === 0 ? '' : block.arrondMine }}</span>
		</div>
	</button>

</template>
