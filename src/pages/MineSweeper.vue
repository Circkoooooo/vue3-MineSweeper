<script lang="ts" setup>

</script>
<template>
	<div>
		Mine Sweeper
		<div v-for="y in 10" :key="y">
			<button w-10 h-10 border="~" border-color="gray" v-for="x in 10" :key="x">{{ (y - 1) * 10 + x }}</button>
		</div>
	</div>
</template>