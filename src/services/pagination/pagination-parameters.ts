import { IPaginationParameters } from './pagination-parameters.interface';
import { ApiModelProperty } from '@nestjs/swagger';

export class PaginationParameters implements IPaginationParameters {
  // tslint:disable-next-line:variable-name
  private _page: number = 1;
  // tslint:disable-next-line:variable-name
  private _page_size: number = 10;
  // tslint:disable-next-line:variable-name
  private _search: string = '';

  @ApiModelProperty({required: false, readOnly: true})
  get page() {
    return this._page;
  }

  set page(page: number) {
    this._page = page > 0 ? page : 1;
  }

  @ApiModelProperty({required: false, readOnly: true})
  get page_size() {
    return this._page_size;
  }

  set page_size(pageSize: number) {
    this._page_size = pageSize > 0 ? pageSize : 10;
  }

  @ApiModelProperty({required: false, readOnly: true})
  get search() {
    return this._search;
  }

  set search(search: string) {
    this._search = typeof search === 'string' ? search : '';
  }
}
