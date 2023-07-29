<template>
	<div class='wrapper'>
		<h1 
			class='page-header'
			:data-status='status'
		>
			{{ headerText }}
		</h1>
		<main class='main'>
			<form
				class='compress-form'
				@submit.prevent='onSubmit'
			>
				<ImagePicker name='image'/>
				<TextInput
					name='quality'
					placeholder='Quality %'
				/>
				<ButtonPrimary>Submit</ButtonPrimary>
			</form>
			<div class='result'>
				<div
					class='success'
					v-if='data'
				>
					<ImagePreview
						v-if='data'
						:src='imageUrl'
					/>
					<LinkButton download :href='imageUrl'>
						Download image
					</LinkButton>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang='ts'>
const { mutate: uploadImage, data, status } = useCompressImageMutation();

const onSubmit = async (event: SubmitEvent) => {
	const form = event.target as HTMLFormElement;
	const body = new FormData(form);

	await uploadImage(body);
}

const headerText = computed(() => {
	switch (status.value) {
		case 'loading':
			return 'Please wait...';
		case 'success':
			return 'Success!';
		case 'error':
			return 'Something went wrong...';
		default:
			return 'Compress Image';
	}
});

const imageUrl = computed(() => {
	if (!data) {
		return null;
	}
	
	return URL.createObjectURL(data.value);
});

</script>

<style scoped lang='scss'>
.wrapper {
	padding-top: 60px;
}

.page-header {
	padding-left: 48px;

	&[data-status='success'] {
		@extend .gradient-font;
	}

	&[data-status='error'] {
		color: $red;
	}
}

.main {
	display: flex;
	padding: 24px;
}

.compress-form,
.result {
	display: flex;
	flex-direction: column;
	width: 50%;
	padding: 10px 24px;
	gap: 10px;
}

.success {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 12px;
}

</style>
