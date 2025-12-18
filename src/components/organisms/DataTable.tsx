import React from 'react';
import { cn } from '@/libs/utils';
import { Icon } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import { EmptyState } from '@/components/molecules/EmptyState';

export interface Column<T> {
    key: string;
    header: string;
    sortable?: boolean;
    width?: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string;
    isLoading?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    onSort?: (key: string) => void;
    emptyIcon?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    className?: string;
}

export function DataTable<T>({
    columns,
    data,
    keyExtractor,
    isLoading = false,
    sortBy,
    sortOrder = 'desc',
    onSort,
    emptyIcon = 'inbox',
    emptyTitle = 'No data found',
    emptyDescription,
    className,
}: DataTableProps<T>) {
    const handleSort = (column: Column<T>) => {
        if (column.sortable && onSort) {
            onSort(column.key);
        }
    };

    const getSortIcon = (columnKey: string) => {
        if (sortBy !== columnKey) return 'unfold_more';
        return sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward';
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Spinner size="lg" className="text-primary" />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <EmptyState
                icon={emptyIcon}
                title={emptyTitle}
                description={emptyDescription}
            />
        );
    }

    return (
        <div className={cn('overflow-x-auto', className)}>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-secondary-light border-b border-border">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={cn(
                                    'px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider',
                                    column.sortable && 'cursor-pointer select-none hover:bg-border/50 transition-colors',
                                    column.className
                                )}
                                style={{ width: column.width }}
                                onClick={() => handleSort(column)}
                            >
                                <div className="flex items-center gap-1">
                                    <span>{column.header}</span>
                                    {column.sortable && (
                                        <Icon
                                            name={getSortIcon(column.key)}
                                            size="sm"
                                            className={cn(
                                                'text-text-muted',
                                                sortBy === column.key && 'text-primary'
                                            )}
                                        />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={keyExtractor(item)}
                            className="border-b border-border hover:bg-secondary-light/50 transition-colors"
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className={cn('px-4 py-3 text-sm text-text-primary', column.className)}
                                >
                                    {column.render
                                        ? column.render(item)
                                        : (item as Record<string, unknown>)[column.key]?.toString() ?? '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
