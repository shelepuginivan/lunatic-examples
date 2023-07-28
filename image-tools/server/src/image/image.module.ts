import { ImageController } from './image.controller';
import { ImageService } from './image.service';

const imageService = new ImageService();

export const imageController = new ImageController(imageService);
