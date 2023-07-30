import { readFile } from 'fs/promises';
import { join } from 'path';
import * as sharp from 'sharp';

import { FormatService } from './format';

export class FormatServiceImpl implements FormatService {
	html(answer: string): string {
		return `<p>Cirno says: <q>${answer}</q>.</p>`;
	}

	async image(answer: string): Promise<Buffer> {
		const pathToImage = join(__dirname, '..', '..', 'assets', 'cirno.png');
		const baseImage = await readFile(pathToImage);
		const image = sharp(baseImage);

		const svgText = Buffer.from(`
			<svg width="1024" height="1024">
				<text
					x="50%"
					y="140"
					fill="#699bd6"
					font-size="80"
					font-width="bold"
					font-family="sans-serif"
					text-anchor="middle"
				>
					${answer}
				</text>
			</svg>
		`);

		return image.composite([{ input: svgText }]).toBuffer();
	}

	json(answer: string): { answer: string } {
		return { answer };
	}

	svg(answer: string): string {
		return `<svg>
			<text>
				mock ${answer}
			</text>
		</svg>`;
	}

	text(answer: string): string {
		return `Cirno says: ${answer}`;
	}

	xml(answer: string): string {
		return `<?xml version="1.0" encoding="UTF-8"?>
			<response>
				<answer>${answer}</answer>
			</response>`;
	}
}

