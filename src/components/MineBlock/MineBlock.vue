<script lang="ts" setup>
import './MineBlock.css'
import type { BlockState } from '@/types'
import { getBlockClass, getBlockTextClass } from './MineBlockClass'

defineProps<{ block: BlockState }>()
const emit = defineEmits(['clickBlock', 'markMine'])
</script>

<template>
	<button
		m="1px"
		flex="~"
		items-center
		justify-center
		min-w-9
		min-h-9
		fw="bold"
		:class="getBlockClass(block)"
		:style="{ color: getBlockTextClass(block) }"
		@click.prevent="emit('clickBlock')"
		@contextmenu.prevent="emit('markMine')"
	>
		<tamplate v-if="!block.revealed">
			<span
				v-if="block.mark"
				i-material-symbols:flag
				color="#f87171"
			></span>
		</tamplate>
		<tamplate v-if="block.revealed">
			<span
				v-if="block.mine"
				i-mdi-mine
			></span>
			<span v-if="!block.mine">
				{{
						block.arrondMine === 0
							? ''
							: block.arrondMine
				}}
			</span>
		</tamplate>
	</button>
</template>
