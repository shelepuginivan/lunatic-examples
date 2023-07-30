import { CirnoService } from '../cirno/cirno'
import { FormatService } from '../format/format'
import { ApiService } from './api'

export class ApiServiceImpl implements ApiService {
	constructor(
		private readonly cirnoService: CirnoService,
		private readonly formatService: FormatService
	) {}

	html(question: string, locale = 'en'): string {
		const answer = this.cirnoService.generateAnswer(
			question,
			locale
		);

		return this.formatService.html(answer);
	}

	async image(question: string, locale = 'en'): Promise<Buffer> {
		const answer = this.cirnoService.generateAnswer(
			question,
			locale
		);

		return this.formatService.image(answer);
	}

	json(question: string, locale = 'en'): { answer: string } {
		const answer = this.cirnoService.generateAnswer(
			question,
			locale
		);

		return this.formatService.json(answer);
	}

	svg(question: string, locale = 'en'): Promise<string> {
		const answer = this.cirnoService.generateAnswer(
			question,
			locale
		);

		return this.formatService.svg(answer);
	}

	text(question: string, locale = 'en'): Promise<string> {
		const answer = this.cirnoService.generateAnswer(
			question,
			locale
		);

		return this.formatService.text(answer);
	}

	xml(question: string, locale = 'en'): string {
		const answer = this.cirnoService.generateAnswer(
			question,
			locale
		);

		return this.formatService.xml(answer);
	}
}

