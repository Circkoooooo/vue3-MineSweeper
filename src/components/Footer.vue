<script lang="ts" setup>
import { toggleDark } from '../composables/dark'

</script>
<template>
	<nav mt-6>
		<a class="icon-btn" href="https://github.com/antfu/vitesse" target="_blank" title="GitHub">
			<div i="carbon-logo-github"></div>
		</a>
		<button class="icon-btn" @click="toggleDark()">
			<div i="carbon-sun dark:carbon-moon"></div>
		</button>
	</nav>
</template>