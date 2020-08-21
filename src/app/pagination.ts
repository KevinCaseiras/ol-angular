export class Pagination {
  limit: number;
  offsetStart: number;
  offsetEnd: number;
  total: number;

  constructor(limit: number, offsetStart: number, offsetEnd: number, total: number) {
    this.limit = limit;
    this.offsetStart = offsetStart;
    this.offsetEnd = offsetEnd;
    this.total = total;
  }

  currentPage(): number {
    return (this.offsetEnd / this.limit);
  }

  setPage(page): void {
    this.offsetEnd = page * this.limit;
    this.offsetStart = this.offsetEnd - (this.limit - 1);
  }
}

