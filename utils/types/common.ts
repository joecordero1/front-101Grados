export interface OptionLabel {
  label: string;
  value: number;
}

export class PaginationMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export class Page<T> {
  readonly data: T[];
  readonly meta: PaginationMetaDto;
}

export interface UploadResponse {
  fileName: string;
  publicURL: string;
}
