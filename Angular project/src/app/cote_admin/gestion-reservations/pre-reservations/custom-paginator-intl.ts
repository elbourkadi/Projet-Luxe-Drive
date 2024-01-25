import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.itemsPerPageLabel = 'Éléments par page';
    this.nextPageLabel = 'Page suivante';
    this.previousPageLabel = 'Page précédente';
    this.firstPageLabel = 'Première page';
    this.lastPageLabel = 'Dernière page';
 
  }
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize + 1;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize - 1, length) : startIndex + pageSize - 1;

    return `${startIndex} - ${endIndex} sur ${length}`;
  };
}
