import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';
import { roles } from '../../services/interfaces/api/roles/IRoleDto';



export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const navigate = inject(Router);

  return authService.verifyToken()
    .pipe(
      map((data) => {
        const result = data.data.roles.some( data => data.role.toString() == roles.ROLE_ADMIN.toString());
        if( !result ){
          navigate.navigate(['/home']);
          return false;
        }
        return result;
      }),
    )
};
