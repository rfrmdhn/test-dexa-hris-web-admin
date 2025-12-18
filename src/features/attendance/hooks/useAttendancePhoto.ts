import { useQuery } from '@tanstack/react-query';
import apiClient from '@/libs/api/client';

export function useAttendancePhoto(photoUrl: string | null) {
    return useQuery({
        queryKey: ['attendance-photo', photoUrl],
        queryFn: async () => {
            if (!photoUrl) return null;
            const response = await apiClient.get(photoUrl, {
                responseType: 'blob',
            });
            return URL.createObjectURL(response.data);
        },
        enabled: !!photoUrl,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}
