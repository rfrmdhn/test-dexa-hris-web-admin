

import React, { useMemo } from 'react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Typography';
import type { PaginationMeta } from '@/libs/types';

import { Select, type SelectOption } from '@/components/molecules/Select';

export interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    className?: string;
    showPageInfo?: boolean;
}

const limitOptions: SelectOption[] = [
    { value: '10', label: '10 / page' },
    { value: '20', label: '20 / page' },
    { value: '50', label: '50 / page' },
    { value: '100', label: '100 / page' },
];

export const Pagination: React.FC<PaginationProps> = ({
    meta,
    onPageChange,
    onLimitChange,
    className,
    showPageInfo = true,
}) => {
    const { page, totalPages, total, limit } = meta;

    const pageNumbers = useMemo(() => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

        const currentPage = page;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > 3) {
                pages.push('ellipsis');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
            }

            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    }, [page, totalPages]);

    const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(startItem + limit - 1, total);

    if (totalPages <= 1 && !showPageInfo) return null;

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            {showPageInfo && (
                <Text size="sm" variant="muted">
                    Showing {startItem} to {endItem} of {total} results
                </Text>
            )}

            {onLimitChange && (
                <div className="w-32">
                    <Select
                        options={limitOptions}
                        value={String(limit)}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        size="sm"
                    />
                </div>
            )}

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                >
                    <Icon name="chevron_left" size="sm" />
                </Button>

                {pageNumbers.map((p, index) =>
                    p === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-text-muted">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={p}
                            variant={p === page ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => onPageChange(p as number)}
                            aria-label={`Page ${p}`}
                            aria-current={p === page ? 'page' : undefined}
                        >
                            {p}
                        </Button>
                    )
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                >
                    <Icon name="chevron_right" size="sm" />
                </Button>
            </div>
        </div>
    );
};
