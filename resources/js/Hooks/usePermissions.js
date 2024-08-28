import { usePage } from '@inertiajs/inertia-react';

export function usePermissions() {
    const { permissions } = usePage().props;
    return (permission) => permissions.includes(permission);
}
