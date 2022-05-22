<script lang="ts" setup>
import MineBlock from '@/components/MineBlock/MineBlock.vue'
import Menu from '@/components/Menu.vue'
import { Game } from '@/composables'
import { ref, watchEffect } from 'vue'

const { state, reset, clickBlock, setLevel, mineNumber, flagNumber, checkGameStatus, markMine, checkWin } = new Game(9, 9, 1)
const ruleShow = ref(false)
watchEffect(checkGameStatus)
watchEffect(checkWin)
</script>

<template>
	<div>
		Mine Sweeper
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
			<div
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
				<span v-if="ruleShow" i-material-symbols:arrow-drop-down></span>
				<span v-else i-material-symbols:arrow-drop-up></span>
			</button>
		</div>
		<div v-if="ruleShow">
			当你看到这个页面的时候，<span text-green>游戏已经开始了</span><br />
			if you has seen this page, the minesweeper is begin. <br>
			<span text-red>点击</span>揭开扫雷区域，<span text-red>long press</span>可以设置为旗帜。<br>
			<span text-red>click</span> to open the block<span text-red> to mark the block</span><br>
			<br>
			上方的三个按钮用于切换难度<br>
			下方的按钮用于重置游戏
		</div>
		<div v-else>
			......
		</div>
	</div>
</template >