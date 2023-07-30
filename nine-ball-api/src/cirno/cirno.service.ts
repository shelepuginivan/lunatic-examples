import { CirnoService } from './cirno';

type AnswerConfidense = 'yes' | 'somewhat' | 'neutral' | 'no';

export class CirnoServiceImpl implements CirnoService {
	private readonly answerOptions: {
		[locale: string]: Record<AnswerConfidense, string[]>
	};

	constructor() {
		this.answerOptions = {
			en: {
				yes: ['Absolutely!'],
				somewhat: ['Maybe lol'],
				neutral: ['Idk'],
				no: ['Nope']
			}
		}
	}

	generateAnswer(_question: string, locale = 'en'): string {
		locale = locale in this.answerOptions ? locale : 'en';

		const confidense = this.choice([
			'yes',
			'somewhat',
			'neutral',
			'no'
		]) as AnswerConfidense;


		const answerArray = this.answerOptions[locale][confidense];

		return this.choice(answerArray);
	}

	private choice<T>(arr: T[]): T {
		const index = Math.floor(Math.random() * arr.length);
		return arr[index];
	}
}
