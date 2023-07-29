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
	gap: 4px;
	background-color: $darkgray;
	padding: 8px 16px;
	cursor: pointer;
	border-radius: 4px;

	&:hover {
		background-color: $gray;
	}
}

</style>
