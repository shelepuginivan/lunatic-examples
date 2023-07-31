import { CirnoService } from './cirno';

type AnswerType = 'yes' | 'somewhat' | 'neutral' | 'no' | 'empty';

export class CirnoServiceImpl implements CirnoService {
	private readonly answerOptions: {
		[locale: string]: Record<AnswerType, string[]>
	};

	constructor() {
		this.answerOptions = {
			en: {
				yes: [
					'I believe so. Now tell everybody about my powers!',
					'Thats correct. Just like eye am the strongest in Gensokyo!!',
					'Absolutely! Trust me, I\'m Cirno'
				],
				somewhat: [
					'The answer is blue!',
					'When you doubt, it\'s because of the fairies',
					'I think it\'s... like something you should... um, like answer yourself'
				],
				neutral: [
					'This is harder than math. By the way I am good at math. 9 * 9 = 36, see?',
					'What do you mean? I don\'t understand',
					'I know the answer. But I won\'t tell you, ha'
				],
				no: [
					'You better go freeze some frogs.',
					'You are wrong. Quit annoying me!',
					'Too boring. You really think it can be true?'
				],
				empty: [
					'I don\'t know why you are here with this.',
					'Ask a question, or I\'ll freeze you!!!',
					'That\'s disrespectful. Don\'t waste my time!!'
				]
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
				],
				empty: [
					'Морковный пирог точно не по... Ты что, ещё не задал вопрос? Задавай быстрее!!',
					'Не трать попросту силы Чирно Великолепной.',
					'Ты не слушал мою речь. Я Всесильная Чирно, а не Чирно-телепат!!!'
				]
			}
		}
	}

	generateAnswer(question: string, locale = 'en'): string {
		locale = locale in this.answerOptions ? locale : 'en';

		if (question.trim() === '') {
			return this.choice(this.answerOptions[locale].empty);
		}


		const confidense = this.choice([
			'yes',
			'somewhat',
			'neutral',
			'no'
		]) as AnswerType;


		const answerArray = this.answerOptions[locale][confidense];

		return this.choice(answerArray);
	}

	private choice<T>(arr: T[]): T {
		const index = Math.floor(Math.random() * arr.length);
		return arr[index];
	}
}
