import 'reflect-metadata';
import { PaginationService } from './pagination.service';
import { PaginationParameters } from './pagination-parameters';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(async () => {
    service = new PaginationService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return pagination result', async () => {
    const query = {
      skip: () => {
        return {
          take: () => {
            return {
              getManyAndCount: () => {
                return new Promise((resolve) => {
                  resolve([[], 0]);
                });
              },
            };
          },
        };
      },
    };
    // @ts-ignore
    expect(await PaginationService.paginate(query, new PaginationParameters())).toStrictEqual({
      current_page: 1,
      last_page: 1,
      page_size: 10,
      total: 0,
      data: [],
    });
  });
});
