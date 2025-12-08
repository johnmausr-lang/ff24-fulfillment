// src/components/ui/data-table-mobile.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableMobileProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

export function DataTableMobile<T extends Record<string, any>>({
  data,
  columns,
  title,
}: DataTableMobileProps<T>) {
  return (
    <>
      {/* Десктоп */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, i) => (
                <TableHead key={i}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, i) => (
              <TableRow key={i}>
                {columns.map((col, j) => (
                  <TableCell key={j} className={col.className}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : item[col.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Мобильная версия — карточки */}
      <div className="md:hidden space-y-4">
        {data.map((item, i) => (
          <Card key={i}>
            {title && <CardHeader><CardTitle>{title} #{i + 1}</CardTitle></CardHeader>}
            <CardContent className="space-y-3 text-sm">
              {columns.map((col, j) => (
                <div key={j} className="flex justify-between">
                  <span className="font-medium">{col.header}:</span>
                  <span className={col.className}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : item[col.accessor]}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
