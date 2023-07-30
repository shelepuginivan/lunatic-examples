import { FormatService } from './format';

export class FormatServiceImpl implements FormatService {
	html(answer: string): string {
		return `<p>Cirno says: <q>${answer}</q>.</p>`;
	}

	image(answer: string): Buffer {
		return Buffer.from(answer + 'mock');
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

