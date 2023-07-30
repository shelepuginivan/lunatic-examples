import random, { Random, RNG } from 'random';
import * as seedrandom from 'seedrandom';

import { CirnoService } from './cirno';

type AnswerConfidense = 'yes' | 'somewhat' | 'neutral' | 'no';

export class CirnoServiceImpl implements CirnoService {
	private readonly answerOptions: {
		[locale: string]: Record<AnswerConfidense, string[]>
	};

	constructor() {
		this.answerOptions = {
			en: {
				yes: [],
				somewhat: [],
				neutral: [],
				no: []
			}
		}
	}

	generateAnswer(question: string, locale = 'en'): string {
		locale = locale in this.answerOptions ? locale : 'en';

		const rng = new Random(seedrandom(question) as unknown as RNG);
		const confidense = rng.choice([
			'yes',
			'somewhat',
			'neutral',
			'no'
		]) as AnswerConfidense;
		const answerArray = this.answerOptions[locale][confidense];

		return random.choice(answerArray) ?? answerArray[0];
	}
}
