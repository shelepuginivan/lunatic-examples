<template>
	<div class='wrapper'>
		<NavHeader/>
		<main class='main'>
			<form
				class='compress-form'
				@submit.prevent='onSubmit'
			>
				<input type='file' name='image'>
				<TextInput
					name='quality'
					placeholder='Quality %'
				/>
				<button>Submit</button>
			</form>
			<div class='result'>
				<img
					v-if='data'
					:src='imageUrl'
					alt='preview'
				>
			</div>
		</main>
	</div>
</template>

<script setup lang='ts'>
const { mutate: uploadImage, data, error, status } = useCompressImageMutation();

const onSubmit = async (event: SubmitEvent) => {
	const form = event.target as HTMLFormElement;
	const body = new FormData(form);

	await uploadImage(body);
}

const imageUrl = computed(() => {
	if (!data) {
		return null;
	}
	
	return URL.createObjectURL(data.value);
})

</script>

<style scoped lang='scss'>
.wrapper {
	padding-top: 60px;
}

.main {
	display: flex;
	padding: 24px;
}

.compress-form {
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 24px;
	gap: 24px;
}
</style>
