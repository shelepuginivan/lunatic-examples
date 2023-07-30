import { formatService } from '../format/format.module';
import { cirnoService } from '../cirno/cirno.module';
import { ApiControllerImpl } from './api.controller';
import { ApiServiceImpl } from './api.service';

const apiService = new ApiServiceImpl(cirnoService, formatService);

export const apiController = new ApiControllerImpl(apiService);

