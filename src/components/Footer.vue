<script lang="ts" setup>
import { toggleDark } from '../composables/dark'

</script>
<template>
	<div mt-5>
		开发进度:20%
	</div>
	<nav mt-6>
		<a class="icon-btn" href="https://github.com/Huangyuanx/Vue3-MineSweeper" target="_blank" title="GitHub">
			<div i="carbon-logo-github"></div>
		</a>
		<button ml-3 class="icon-btn" @click="toggleDark()">
			<div i="carbon-sun dark:carbon-moon"></div>
		</button>
	</nav>
</template>