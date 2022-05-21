<script lang="ts" setup>
import { Game } from '@/composables'
import MineBlock from '../components/MineBlock.vue'
import Menu from '@/components/Menu.vue'

const { state, reset, clickBlock, setLevel } = new Game(9, 9, 1)

</script>

<template>
	<div>
		Mine Sweeper
		<div flex="~" items-center justify-center>
			<Menu text="Eazy" @clickLogic="setLevel(1)" />
			<Menu text="Medium" @clickLogic="setLevel(2)" />
			<Menu text="Hard" @clickLogic="setLevel(3)" />
		</div>
		<div w-full overflow-auto mt-5 p-5>
			<div v-for="row, y in state" :key="y" flex="~" items-center justify-center w-max m-auto>
				<MineBlock v-for="block, x in row" :block="block" :key="x" @clickBlock="clickBlock(block)" />
			</div>
		</div>
		<Menu text="reset" @clickLogic="reset" />
	</div>
</template >