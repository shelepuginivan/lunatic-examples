import { Request, Response, UploadedFile } from '@shelepuginivan/lunatic';
import { getType } from 'mime';

import { HttpException } from '../exception/http.exception';
import { ImageService } from './image.service';

export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	async convertImage(req: Request, res: Response) {
		try {
			const [image] = (req.files as Record<'image', UploadedFile[]>).image;
			const format = (req.body as Record<'format', string>).format;

			const convertedImage = await this.imageService.convertImage(image.data, format);

			await res.status(200).send(convertedImage, `image/${format}`);
		} catch (error) {
			const status = error instanceof HttpException ? error.status : 500;
			const message = error instanceof Error ? error.message : 'Something went wrong';
			await res.status(status).json({ message });
		}
	}

	async compressImage(req: Request, res: Response) {
		try {
			const [image] = (req.files as Record<'image', UploadedFile[]>).image;
			const quality = (req.body as Record<'quality', string>).quality;
			const imageBuffer = image.data;
			const format = image.filename.split('.').at(-1) as string;

			const compressedImage = await this.imageService.compressImage(
				imageBuffer,
				format,
				Number(quality)
			);

			const mimeType = getType(format) || 'application/octet-stream';

			await res.status(200).send(compressedImage, mimeType);
		} catch (error) {
			const status = error instanceof HttpException ? error.status : 500;
			const message = error instanceof Error ? error.message : 'Something went wrong';
			await res.status(status).json({ message });
		}
	}
}
