<template>
	<button class='button'>
		<slot></slot>
	</button>
</template>

<style scoped lang='scss'>
.button {
	transition: $transition;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	padding: 16px;
	border: 2px solid $lightgreen;
	color: $lightgreen;
	background-color: transparent;
	cursor: pointer;
	border-radius: 12px;

	&:hover {
		background-color: $lightgreen;
		color: $black;
	}
}

</style>
