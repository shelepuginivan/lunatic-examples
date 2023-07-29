import { useMutation } from '@tanstack/vue-query';

export const useConvertImageMutation = () => {
	const config = useRuntimeConfig();
	const apiUrl = config.public.apiBaseUrl;

	return useMutation({
		mutationKey: ['convert'],
		mutationFn: (body: FormData) =>
			$fetch(`${apiUrl}/image/convert`, {
				body,
				method: 'POST',
				responseType: 'blob'
			})
	})
}
