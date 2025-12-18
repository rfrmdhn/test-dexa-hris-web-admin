/**
 * Pagination Molecule
 * Page navigation with prev/next and page numbers
 */

import React, { useMemo } from 'react';
import { cn } from '@/libs/utils';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Typography';
import type { PaginationMeta } from '@/libs/types';

export interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    className?: string;
    showPageInfo?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
    meta,
    onPageChange,
    className,
    showPageInfo = true,
}) => {
    const { page, totalPages, total, limit } = meta;

    // Calculate visible page numbers
    const pageNumbers = useMemo(() => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

        // Use page instead of currentPage
        const currentPage = page;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('ellipsis');
            }

            // Show pages around current
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis');
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
    }, [page, totalPages]);

    // Calculate showing range
    const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
    // Calculate endItem without itemCount, assuming full pages except maybe last, but bounded by total
    const endItem = Math.min(startItem + limit - 1, total);

    if (totalPages <= 1 && !showPageInfo) return null;

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            {showPageInfo && (
                <Text size="sm" variant="muted">
                    Showing {startItem} to {endItem} of {total} results
                </Text>
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
