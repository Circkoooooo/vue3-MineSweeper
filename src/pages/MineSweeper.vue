<script lang="ts" setup>
import MineButton from '@/components/MineButton.vue'
import { Game } from '@/composables'


const { state, checkMine } = new Game(9, 9)


// generateMine()
// calcAroundMine()

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