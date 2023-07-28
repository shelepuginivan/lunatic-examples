import * as sharp from 'sharp';

import { BadRequest } from '../exception/http.exception';

export class ImageService {
	async convertImage(image: Buffer, format: string): Promise<Buffer> {
		try {
			const convertedImage = await sharp(image)
				.toFormat(format as keyof sharp.FormatEnum)
				.toBuffer();

			return convertedImage;
		} catch {
			throw new BadRequest('Invalid format');
		}
	}

	async compressImage(image: Buffer, imageFormat: string, quality: number): Promise<Buffer> {
		try {
			const compressedImage = await sharp(image)
				.toFormat(imageFormat as keyof sharp.FormatEnum, { quality })
				.toBuffer();

			return compressedImage;
		} catch {
			throw new BadRequest('Invalid format');
		}
	}
}
