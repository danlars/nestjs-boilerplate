import 'reflect-metadata';
import { PaginationParameters } from './pagination-parameters';

describe('PaginationParameters', () => {
  let service: PaginationParameters;

  beforeEach(async () => {
    service = new PaginationParameters();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should Return default value from page parameter', () => {
    service.page = 0;
    expect(service.page).toBe(1);
  });

  it('Should Return defined number from page parameter', () => {
    const res = 10;
    service.page = res;
    expect(service.page).toBe(res);
  });

  it('Should Return default value from page_size parameter', () => {
    service.page_size = 0;
    expect(service.page_size).toBe(10);
  });

  it('Should Return defined number from page_size parameter', () => {
    const res = 15;
    service.page_size = res;
    expect(service.page_size).toBe(res);
  });

  it('Should Return default value from search parameter', () => {
    service.search = undefined;
    expect(service.search).toBe('');
  });

  it('Should Return defined string from search parameter', () => {
    const res = 'test';
    service.search = res;
    expect(service.search).toBe(res);
  });
});
