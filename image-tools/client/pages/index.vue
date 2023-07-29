<template>
	<main>
		<section class='intro'>
			<h1 class='main-header'>Optimize and convert your images</h1>
			<p class='caption'>Intuitive image processing with <strong>Image Tools</strong></p>
		</section>
		<section class='nav'>
			<BlockLink
				header='Convert image'
				description='Convert your image to one of many modern formats'
				icon='material-symbols:wallpaper-slideshow-sharp'
				to='/convert'
			/>
			<BlockLink
				description='Optimize your image and decrease its size'
				header='Compress image'
				icon='material-symbols:compress-rounded'
				to='/compress'
			/>
		</section>
	</main>
</template>

<script setup lang='ts'>
useHead({
	title: 'Image Tools'
});
</script>

<style scoped lang='scss'>
.intro {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 80px;
	height: 100vh;
}

.main-header {
	@extend .gradient-font;
	font-size: 72px;
	margin-bottom: 24px;
}

.caption {
	font-size: x-large;
	color: $lightgray;
}

.nav {
	display: grid;
	gap: 24px;
	grid-template-columns: repeat(2, 1fr);
	padding: 80px;
}

</style>
