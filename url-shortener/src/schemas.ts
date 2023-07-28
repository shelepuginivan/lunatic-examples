import { z } from 'zod';

export const urlCreationSchema = z.object({
	url: z.string().url()
});
