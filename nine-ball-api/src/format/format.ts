export interface FormatService {
	html(answer: string): string
	image(answer: string): Promise<Buffer>
	json(answer: string): { answer: string }
	svg(answer: string): Promise<string>
	text(answer: string): Promise<string>
	xml(answer: string): string
}

