export interface ApiService {
	html(question: string, locale: string): string
	image(question: string, locale: string): Promise<Buffer>
	json(question: string, locale: string): { answer: string }
	svg(question: string, locale: string): string
	text(question: string, locale: string): string
	xml(question: string, locale: string): string
}

