import { inject } from '@angular/core';
import { AuthService } from './auth.service';
export const authInterceptor = (request, next) => {
    const auth = inject(AuthService);
    const token = auth.token;
    if (!token)
        return next(request);
    return next(request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
    }));
};
//# sourceMappingURL=auth.interceptor.js.map