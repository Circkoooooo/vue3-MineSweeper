<script lang="ts" setup>

</script>

<template>
	<div>
		Mine Sweeper
		<div w-full overflow-auto>
			<div v-for="y in 10" :key="y" flex="~" items-center justify-center w-max ma>
				<button min-w-10 min-h-10 border="~" border-color="gray" v-for="x in 10" :key="x">{{ (y - 1) * 10 + x
				}}</button>
			</div>
		</div>
	</div>
</template>