/* eslint-disable */
import { runInInjectionContext } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id: 'example',
    //     title: 'Example',
    //     type: 'basic',
    //     icon: 'heroicons_outline:chart-pie',
    //     link: '/example',
    // },
    {
        id: 'admins-management',
        title: 'Admins Management',
        type: 'basic',
        icon: 'heroicons_outline:user-group',
        link: '/admins',
        hidden: (item) => item.meta.user.role != 'ROLE_SUPER_ADMIN',
    },
    {
        id: 'courses-management',
        title: 'Courses Management',
        type: 'basic',
        icon: 'heroicons_outline:document',
        link: '/courses',
    },
    {
        id: 'puzzles-management',
        title: 'Puzzles Management',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/puzzels',
    },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
