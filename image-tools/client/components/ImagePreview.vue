<template>
	<img
		class='image-preview'
		:src='src'
		alt='Image preview'
	>
</template>

<script setup lang='ts'>
defineProps<{ src: string }>();
</script>

<style lang='scss'>
.image-preview {
	border: 1px solid $lightgray;
	border-radius: 8px;
	max-height: 300px;
	max-width: 300px
}

</style>
