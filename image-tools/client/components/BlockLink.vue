<template>
	<NuxtLink class='link' :to='to'>
		<Icon
			:name='icon'
			size='64px'
		/>
		<h2 class='option-header'>
			{{ header }}
		</h2>
		<p class='option-description'>
			{{ description }}
		</p>
	</NuxtLink>
</template>

<script setup lang='ts'>
interface Props {
	header: string
	description?: string
	icon: string
	to: string
}

defineProps<Props>();
</script>

<style scoped lang='scss'>
.link {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	aspect-ratio: 1 / 1;
	padding: 60px;
	border: 1px solid $gray;
	border-radius: 12px;
	text-decoration: none;
	font-size: x-large;
	text-align: center;
}

.option-header {
	@extend .gradient-font;
}

.option-description {
	color: $lightgray;
}

</style>
