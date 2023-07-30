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
			},
			ru: {
				yes: [
					'Абсолютно. В знак признательности мне построй Чирногорию',
					'Шар говорит, что абсолютно точ... В каком смысле шар не может говорить?',
					'Определённо да. И вот на это ты потратил моё время?!!'
				],
				somewhat: [
					'Одна моя знакомая ответила бы: "Хо-хо-хо"',
					'Шар рассакзал всё мне об этой проблеме. Но ответ тебе не скажу',
					'ZZZ... Я не сплю! Я собираю силу... А ты повтори ещё раз вопрос!!',
					'2 + 2 были легче этого... Что? Нееет, Чирно молчала. Это всё шар, да, точно шар'
				],
				neutral: [
					'Можешь, конечно, попробовать. Чирно не против.', 
					'Звёзды не дают мне внятного ответа. Это в шаре звёзды просто. Созвездие ⑨ существует',
					'Эммм... Как считает твоё сердце'
				],
				no: [
					'В алгебре не разбираюсь',
					'Не утруждай нас этой безнравственностью. ДА, я знаю такие умные слова, я Всезнающая',
					'Точно нет. Иначе появится второй Чирнобыль'
				]
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
