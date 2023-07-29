import { useMutation } from '@tanstack/vue-query'

export const useCompressImageMutation = () => {
	const config = useRuntimeConfig();
	const apiUrl = config.public.apiBaseUrl;

	return useMutation({
		mutationKey: ['compress'],
		mutationFn: (body: FormData) =>
			$fetch(`${apiUrl}/image/compress`, {
				body,
				method: 'POST',
				responseType: 'blob'
			})
	});
}
