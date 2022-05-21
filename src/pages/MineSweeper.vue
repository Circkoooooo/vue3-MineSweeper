<script lang="ts" setup>
import { Game } from '@/composables'
import MineBlock from '../components/MineBlock.vue'
import MineMenu from '@/components/MineMenu.vue'

const { state, checkMine, reset } = new Game(9, 9)


// generateMine()
// calcAroundMine()

</script>

<template>
	<div>
		Mine Sweeper
		<div w-full overflow-auto mt-5>
			<div v-for="row, y in state" :key="y" flex="~" items-center justify-center w-max m-auto>
				<MineBlock v-for="block, x in row" :block="block" :key="x" @click="checkMine(block)" border-red />
			</div>
			<MineMenu @click="reset"></MineMenu>
		</div>
	</div>
</template >