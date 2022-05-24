<script lang="ts" setup>
import MineBlock from '@/components/MineBlock/MineBlock.vue'
import Menu from '@/components/Menu.vue'
import { Game } from '@/composables'
import { ref, watchEffect } from 'vue'
const { state, reset, clickBlock, setLevel, gameStatus, mineNumber, flagNumber, checkGameStatus, markMine } = new Game(1)

const ruleShow = ref(false)
watchEffect(checkGameStatus)

</script>

<template>
	<div>
		Mine Sweeper <br>
		<div
			flex="~"
			items-center
			justify-center>
			<Menu
				text="Eazy"
				@clickLogic="setLevel(1)" />
			<Menu
				text="Medium"
				@clickLogic="setLevel(2)" />
			<Menu
				text="Hard"
				@clickLogic="setLevel(3)" />
		</div>
		<!-- NumberInfo -->

		<div
			mt-5
			flex="~"
			items-center
			justify-center>
			<div>
				<span text-red>
					{{ gameStatus }}
				</span>
			</div>
			<div
				ml-4
				flex="~"
				name="mineNumber">
				<span i-mdi-mine />
				-{{ mineNumber - flagNumber }}
			</div>
			<div
				ml-4
				flex="~"
				name="flagNumber">
				<span i-material-symbols:flag />
				-{{ flagNumber }}
			</div>
		</div>
		<div
			w-full
			overflow-auto
			mt-2>
			<div
				v-for="row, y in state"
				:key="y"
				flex="~"
				items-center
				justify-center
				w-max
				m-auto>
				<MineBlock
					v-for="block, x in row"
					:block="block"
					:key="x"
					@clickBlock="clickBlock(block)"
					@markMine="markMine(block)" />
			</div>
		</div>
		<Menu
			text="reset"
			@clickLogic="reset" />
	</div>

	<div mt-5>
		<div flex="~" justify-center items-center>
			<span flex="~" justify-center>规则</span>
			<button @click="ruleShow = !ruleShow" ml-3 flex="~">
				<span v-if="ruleShow" i-material-symbols:arrow-drop-up></span>
				<span v-else i-material-symbols:arrow-drop-down></span>
			</button>
		</div>
		<div v-if="ruleShow">
			当你看到这个页面的时候，<span text-green>游戏已经开始了</span><br />
			<span text-red>点击</span>揭开扫雷区域，<span text-red>长按</span>可以设置为旗帜。<br>
			上方的三个按钮用于切换难度<br>
			下方的按钮用于重置游戏
		</div>
		<br>
		<!-- en -->
		<div v-if="ruleShow">
			if you has seen this page, the minesweeper was begin. <br>
			<span text-red>click</span> to open the block,
			<span text-red>long press</span> to mark the block<br>
			you can press the button on the top to change the level<br>
			the button on the bottom to reset the game
		</div>
		<div v-else>
			......
		</div>
	</div>
</template >