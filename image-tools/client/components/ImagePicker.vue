<template>
	<div class='image-picker'>
		<label
			for='image-picker'
			class='label'
			@drop.prevent='handleDrop'
			@dragover.prevent
			@dragenter.prevent
		>
			<span>Please choose an image...</span>
		</label>
		<input
			id='image-picker'
			:ref='inputRef'
			:name='name'
			type='file'
			accept='image/*'
			@change='handleFileInput'
		>
		<img
			:src='imagePreviewUrl'
			:data-has-content='!!imagePreviewUrl'
			class='image-preview'
			alt=''
		>
		<ButtonSecondary
			class='button-clean'
			type='button'
			@click='cleanImage'
		>
			<Icon name='cil:x'/>
		</ButtonSecondary>
	</div>
</template>

<script setup lang='ts'>
defineProps<{ name: string }>();
const emits = defineEmits(['change']);

const inputRef = ref<HTMLInputElement>();
const imagePreviewUrl = ref(null);

const handleFileInput = (event: InputEvent) => {
	const file = (event.target as HTMLInputElement).files?.[0];
	setImagePreview(file);
	setFileInputValue(file);
};

const handleDrop = (event: DragEvent) => {
	const file = event.dataTransfer?.files?.[0];
	setImagePreview(file);
	setFileInputValue(file);
};

const cleanImage = () => {
	toRef(inputRef, 'value').files = null;
	imagePreviewUrl.value = null;
};

const setImagePreview = (file: File | undefined) => {
	if (!file) { return; }

	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		imagePreviewUrl.value = reader.result;
	};
};

const setFileInputValue = (file: File | undefined) => {
	if (!file) { return; }

	const formData = new FormData();
	formData.append('file', file);
	toRef(inputRef, 'value').files = formData;
};

</script>

<style scoped lang='scss'>
.image-picker {
	position: relative;
	width: 300px;
	height: 300px;
	border: 1px solid $lightgray;
	overflow: hidden;
	border-radius: 8px;

	input[type='file'] {
		visibility: hidden;
	}
}

.label {
	width: 300px;
	height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: medium;
	cursor: pointer;

	span {
		width: 70%;
		text-align: center;
	}
}

.image-preview {
	position: absolute;
	top: 0;
	left: 0;
	z-index: $z-1;
	width: 300px;
	height: 300px;
	object-fit: contain;
	object-position: center;
	background-color: $black;

	&[data-has-content=false],
	&[data-has-content=false] + button,
	&[data-has-content=false] + label {
		display: none
	}
}

.button-clean {
	position: absolute;
	right: 0;
	top: 0;
	z-index: $z-2;
}

</style>
