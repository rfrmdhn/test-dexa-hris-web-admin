import type { SelectOption } from '@/components/molecules/Select';

export const ROLE_FILTER_OPTIONS: SelectOption[] = [
    { value: '', label: 'All Roles' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'EMPLOYEE', label: 'Employee' },
];

export const USER_ROLE_OPTIONS: SelectOption[] = [
    { value: 'EMPLOYEE', label: 'Employee' },
    { value: 'ADMIN', label: 'Admin' },
];
