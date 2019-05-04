export interface PaginationInterface {
  current_page: number;
  last_page: number;
  page_size: number;
  data: any[];
  total: number;
}
