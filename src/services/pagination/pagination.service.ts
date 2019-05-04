import { PaginationInterface } from './pagination.interface';
import { QueryParameters } from './query-parameters.interface';
import { FindManyOptions, SelectQueryBuilder } from 'typeorm';

export class PaginationService {
  static async paginate(entity: SelectQueryBuilder<any>, options: QueryParameters): Promise<PaginationInterface> {
    const findManyOptions: FindManyOptions = {};
    findManyOptions.take = options.page_size || 10;
    findManyOptions.skip = options.page || 1;
    const [data, total] = await entity
      .skip((findManyOptions.skip - 1) * findManyOptions.take)
      .take(findManyOptions.take)
      .getManyAndCount();
    return {
      current_page: findManyOptions.skip,
      last_page: Math.ceil(total / findManyOptions.take),
      page_size: findManyOptions.take,
      total,
      data,
    };
  }
}
