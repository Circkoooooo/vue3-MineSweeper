<script setup lang="ts">
defineProps<{
	text: string
}>()
const emit = defineEmits(['clickLogic'])

</script>
<template>
	<div mt-5 ml-2 mr-2 flex="~" items-center justify-center select-none>
		<div pl-4 pr-4 pt-1 pb-1 bg-blue cursor-pointer border-rd="1" @click="emit('clickLogic')">
			{{ text }}
		</div>
	</div>
</template>