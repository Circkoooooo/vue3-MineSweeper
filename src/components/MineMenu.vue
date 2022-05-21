<script setup lang="ts">
const emit = defineEmits(['reset'])

const resetBtn = () => {
	emit('reset')
}
</script>
<template>
	<div mt-10 flex="~" w-full items-center justify-center select-none>
		<div pl-4 pr-4 pt-1 pb-1 bg-blue cursor-pointer border-rd="1" @click="resetBtn">
			reset
		</div>
	</div>
</template>