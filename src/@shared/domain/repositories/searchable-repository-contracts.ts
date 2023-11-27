import { Entity } from '../entities/entity.entity';
import { Repository } from './repository-contracts';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: string;
  perPage?: string;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: string | null;
};

export class SearchParams {
  protected _page?: number;
  protected _perPage = 15;
  protected _sort?: string | null;
  protected _sortDir?: SortDirection | null;
  protected _filter?: string | null;

  constructor(props: SearchProps) {
    this._page = parseInt(props.page);
    this._perPage = parseInt(props.perPage);
    this._sort = props.sort;
    this._sortDir = props.sortDir;
    this._filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    if (isNaN(value) || value <= 0) value = 1;

    this._page = value;
  }

  get perPage() {
    return this._perPage;
  }

  private set perPage(value: number) {
    if (isNaN(value) || value <= 0) value = this._perPage;

    this._perPage = value;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value || null;
  }

  get sortDir() {
    return this._sortDir;
  }

  private set sortDir(value: SortDirection) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }

    const dir = String(value).toLowerCase();

    this._sortDir = dir != 'asc' && dir != 'desc' ? 'desc' : dir;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value || null;
  }
}

export interface SearchableRepository<E extends Entity, SearchParams, Result>
  extends Repository<E> {
  search(props: SearchParams): Promise<Result>;
}
