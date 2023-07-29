<template>
	<input type='text' class='text-input'/>
</template>

<style scoped lang='scss'>
.text-input {
	transition: $transition;
	padding: 4px 12px;
	background-color: transparent;
	border: 1px solid $lightgray;
	border-radius: 4px;

	&:focus,
	&:focus-within {
		border-color: $lightgreen;
	}
}
</style>
