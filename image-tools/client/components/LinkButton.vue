<template>
	<a
		class='link-button'
		:href='href'
	>
		<slot/>
	</a>
</template>

<script setup lang='ts'>
defineProps<{ href: string }>();
</script>

<style scoped lang='scss'>
.link-button {
	transition: $transition;
	display: flex;
	align-items: center;
	gap: 4px;
	background-color: $darkgray;
	padding: 8px 16px;
	cursor: pointer;
	border-radius: 4px;
	text-decoration: none;

	&:hover {
		background-color: $gray;
	}
}

</style>
