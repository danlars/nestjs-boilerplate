import { PaginationInterface } from './pagination.interface';
import { IPaginationParameters } from './pagination-parameters.interface';
import { SelectQueryBuilder } from 'typeorm';

export class PaginationService {
  static async paginate(entity: SelectQueryBuilder<any>, options: IPaginationParameters): Promise<PaginationInterface> {
    const [data, total] = await entity
      .skip((options.page - 1) * options.page_size)
      .take(options.page_size)
      .getManyAndCount();
    return {
      current_page: options.page,
      last_page: Math.ceil(total / options.page_size),
      page_size: options.page_size,
      total,
      data,
    };
  }
}
