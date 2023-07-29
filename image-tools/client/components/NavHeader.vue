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
	width: 100%;
	padding-inline: 24px;
	background-color: rgba($black, .6);
	backdrop-filter: blur(6px);
}

.icon-logo {
	color: $yellow;
}

.main-link {
	@extend .gradient-font;
	text-decoration: none;

}

</style>
