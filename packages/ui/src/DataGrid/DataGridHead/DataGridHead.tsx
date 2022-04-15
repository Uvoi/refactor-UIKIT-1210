import { useCallback, useMemo } from 'react';

import { TableHead } from '../../Table/TableHead';
import { TableCell, TableRow } from '../../Table';
import { Checkbox } from '../../Checkbox';
import { SortStates } from '../constants';

import DataGridHeadColumns from './DataGridHeadColumns';
import { DataGridHeadProps } from './types';

export function DataGridHead<T>({
  columns,
  selectable,
  onSelectAllRows,
  rowsCount,
  onSort,
  sorting = [],
  uncheckedRowsCount,
}: DataGridHeadProps<T>) {
  const checked = useMemo(
    () => !Boolean(uncheckedRowsCount) && rowsCount > 0,
    [uncheckedRowsCount, rowsCount]
  );

  const indeterminate = useMemo(
    () => uncheckedRowsCount > 0 && uncheckedRowsCount < rowsCount,
    [uncheckedRowsCount, rowsCount]
  );

  const handleSort = useCallback(
    (field, sortable) => () => {
      if (sortable) {
        const currentSort = sorting.find(({ fieldId }) => fieldId === field);

        // если для выбранного столбца текущая сортировка ASC - меняем на DESC
        if (currentSort && currentSort.sort === SortStates.ASC) {
          const newSorting = [
            ...sorting.filter(({ fieldId }) => fieldId !== field),
            { fieldId: field, sort: SortStates.DESC },
          ];

          return onSort(newSorting);
          // если для выбранного столбца текущая сортировка DESC - убираем сортировку
        } else if (currentSort && currentSort.sort === SortStates.DESC) {
          const newSorting = sorting.filter(({ fieldId }) => fieldId !== field);

          return onSort(newSorting);
        }

        // если для выбранного столбца нет сортировки - добавляем сортировку ASC
        onSort([...sorting, { fieldId: field, sort: SortStates.ASC }]);
      }
    },
    [sorting]
  );

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              checked={checked}
              indeterminate={indeterminate}
              onChange={onSelectAllRows}
            />
          </TableCell>
        )}
        <DataGridHeadColumns
          columns={columns}
          onSort={handleSort}
          sorting={sorting}
        />
      </TableRow>
    </TableHead>
  );
}
