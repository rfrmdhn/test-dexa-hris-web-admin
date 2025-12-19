

export const queryKeys = {
    auth: {
        all: ['auth'] as const,
        user: () => [...queryKeys.auth.all, 'user'] as const,
    },
    employees: {
        all: ['employees'] as const,
        lists: () => [...queryKeys.employees.all, 'list'] as const,
        list: (params: Record<string, any>) => [...queryKeys.employees.lists(), params] as const,
        details: () => [...queryKeys.employees.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.employees.details(), id] as const,
    },
    attendance: {
        all: ['attendance'] as const,
        lists: () => [...queryKeys.attendance.all, 'list'] as const,
        list: (params: Record<string, any> = {}) => [...queryKeys.attendance.lists(), params] as const,
        history: () => [...queryKeys.attendance.all, 'history'] as const,
    },
};
