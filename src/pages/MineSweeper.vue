<script lang="ts" setup>
import MineBlock from '@/components/MineBlock/MineBlock.vue'
import Menu from '@/components/Menu.vue'

import { Game, markMine } from '@/composables'
const { state, reset, clickBlock, setLevel, mineNumber, touchStart, touchEnd } = new Game(9, 9, 1)

</script>

<template>
	<div>
		Mine Sweeper
		<div
			flex="~"
			items-center
			justify-center
		>
			<Menu
				text="Eazy"
				@clickLogic="setLevel(1)"
			/>
			<Menu
				text="Medium"
				@clickLogic="setLevel(2)"
			/>
			<Menu
				text="Hard"
				@clickLogic="setLevel(3)"
			/>
		</div>
		<div
			w-full
			overflow-auto
			mt-5
			p-5
		>
			<div>
				<span>{{ mineNumber }}</span>
			</div>
			<div
				v-for="row, y in state"
				:key="y"
				flex="~"
				items-center
				justify-center
				w-max
				m-auto
			>
				<MineBlock
					v-for="block, x in row"
					:block="block"
					:key="x"
					@click="touchStart(block)"
					@touchEnd="
					touchEnd"
					@clickBlock="clickBlock(block)"
					@markMine="markMine(block)"
				/>
			</div>
		</div>
		<Menu
			text="reset"
			@clickLogic="reset"
		/>
	</div>
</template >