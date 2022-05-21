<script lang="ts" setup>

import type { BlockState } from '@/types'
defineProps<{ block: BlockState }>()


const getBlockBorderClass = (block: BlockState) => {
	return block.mine ? ['text-red', 'border-red'] : 'text-gray'
}

</script>

<template>
	<button min-w-10 min-h-10 fw="bold" border="~ gray" hover:bg='#DCDCDC' :class="getBlockBorderClass(block)">
		<span v-if="block.mine" i-mdi-mine></span>
		<span v-else>{{ block.arrondMine }}</span>
	</button>

</template>
