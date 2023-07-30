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
					font-weight="bold"
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

	async svg(answer: string): Promise<string> {
		const pathToSVG = join(__dirname, '..', '..', 'assets', 'cirno.svg');
		const svgBuffer = await readFile(pathToSVG);
		const svg = svgBuffer.toString();

		return `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
			${svg}
			<text
				x="50%"
				y="475"
				fill="#699bd6"
				font-size="40"
				font-weight="bold"
				font-family="sans-serif"
				text-anchor="middle"
			>
				${answer}
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

