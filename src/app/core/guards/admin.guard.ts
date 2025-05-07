import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getRole().pipe(
    map((user) => {
      console.log(user);

      if (!user) {
        router.navigate(['/auth']);
        return false;
      }

      if (user.role !== 'admin') {
        router.navigate(['/dashboard']);
        return false;
      }

      return true;
    })
  );
};
