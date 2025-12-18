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
    const { currentPage, totalPages, totalItems, itemCount, itemsPerPage } = meta;

    // Calculate visible page numbers
    const pageNumbers = useMemo(() => {
        const pages: (number | 'ellipsis')[] = [];
        const maxVisiblePages = 5;

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
    }, [currentPage, totalPages]);

    // Calculate showing range
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(startItem + itemCount - 1, totalItems);

    if (totalPages <= 1 && !showPageInfo) return null;

    return (
        <div className={cn('flex items-center justify-between gap-4', className)}>
            {showPageInfo && (
                <Text size="sm" variant="muted">
                    Showing {startItem} to {endItem} of {totalItems} results
                </Text>
            )}

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    aria-label="Previous page"
                >
                    <Icon name="chevron_left" size="sm" />
                </Button>

                {pageNumbers.map((page, index) =>
                    page === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-text-muted">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={page}
                            variant={page === currentPage ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => onPageChange(page)}
                            aria-label={`Page ${page}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </Button>
                    )
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    aria-label="Next page"
                >
                    <Icon name="chevron_right" size="sm" />
                </Button>
            </div>
        </div>
    );
};
