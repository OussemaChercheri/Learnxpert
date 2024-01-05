import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { of, switchMap } from 'rxjs';

export const SuperGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(UserService).user$.pipe(
        switchMap((user) => {
            // If the user is not authenticated...
            if (user.role !== 'ROLE_SUPER_ADMIN') {
                // Redirect to the sign-in page with a redirectUrl param
                const urlTree = router.parseUrl(``);

                return of(urlTree);
            }

            // Allow the access
            return of(true);
        })
    );
};
