import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box } from '@mui/material';

export type TableColumn<T> = {
  accessorKey: keyof T;
  header: string;
  size: number;
  Cell?: (cellValue: any, row: T) => JSX.Element;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
};

const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const { columns: tableColumns, data, onRowClick } = props;

  const memoizedColumns = useMemo<MRT_ColumnDef<T>[]>(() => {
    const columnDefs: MRT_ColumnDef<T>[] = [];

    for (const column of tableColumns) {
      const accessorKey: keyof T = column.accessorKey;
      const columnDef: MRT_ColumnDef<T> = {
        //@ts-ignore
        accessorKey: accessorKey,
        header: column.header,
        size: column.size,
      };

      if (column.Cell) {
        columnDef.Cell = ({ cell, row }) =>
          column.Cell(cell.getValue(), row.original);
      }

      columnDefs.push(columnDef);
    }

    return columnDefs;
  }, [tableColumns]);

  return (
    <MaterialReactTable
      columns={memoizedColumns}
      data={data}
      editingMode="modal"
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => onRowClick && onRowClick(row.original),
        sx: {
          cursor: 'pointer',
        },
      })}
    />
  );
};

export default Table;
