import { Request, Response } from '@shelepuginivan/lunatic';

import { ApiController, ApiService } from './api';

export class ApiControllerImpl implements ApiController {
	constructor(private readonly apiService: ApiService) {}

	html(req: Request, res: Response) {
		const { q, hl } = req.query;

		if (typeof q !== 'string') {
			return res.status(400).json({ message: 'invalid data' });
		}

		const body = this.apiService.html(q, String(hl));
		return res.status(200).send(body, 'text/html');
	}

	async image(req: Request, res: Response) {
		const { q, hl } = req.query;

		if (typeof q !== 'string') {
			return res.status(400).json({ message: 'invalid data' });
		}

		const image = await this.apiService.image(q, String(hl));
		return res.status(200).send(image, 'image/png');
	}
	
	json(req: Request, res: Response) {
		const { q, hl } = req.query;

		if (typeof q !== 'string') {
			return res.status(400).json({ message: 'invalid data' });
		}

		const body = this.apiService.json(q, String(hl));
		return res.status(200).json(body);
	}

	svg(req: Request, res: Response) {
		const { q, hl } = req.query;

		if (typeof q !== 'string') {
			return res.status(400).json({ message: 'invalid data' });
		}

		const svgImage = this.apiService.svg(q, String(hl));
		return res.status(200).send(svgImage, 'image/svg+xml');
	}

	text(req: Request, res: Response) {
		const { q, hl } = req.query;

		if (typeof q !== 'string') {
			return res.status(400).json({ message: 'invalid data' });
		}

		const text = this.apiService.text(q, String(hl));
		return res.status(200).text(text);
	}

	xml(req: Request, res: Response) {
		const { q, hl } = req.query;

		if (typeof q !== 'string') {
			return res.status(400).json({ message: 'invalid data' });
		}

		const xml = this.apiService.xml(q, String(hl));
		return res.status(200).send(xml, 'application/xml');
	}
}

