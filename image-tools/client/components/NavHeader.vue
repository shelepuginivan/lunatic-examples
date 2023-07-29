<template>
	<header class='header'>
		<NuxtLink class='main-link' to='/'>
			<IconCSS class='icon-logo' name='lucide:image'/>
			Image Tools
		</NuxtLink>
	</header>
</template>

<style scoped lang='scss'>
.header {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	position: fixed;
	left: 0;
	top: 0;
	height: 60px;
	padding-inline: 24px;
}

.icon-logo {
	color: $yellow;
}

.main-link {
	@extend .gradient-font;
	text-decoration: none;

}

</style>
