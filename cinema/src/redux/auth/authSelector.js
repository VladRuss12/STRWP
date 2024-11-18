import { createSelector } from 'reselect';

// Селектор для получения состояния аутентификации
export const selectAuthState = (state) => state.auth;

// Мемоизированный селектор для проверки аутентификации
export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

// Мемоизированный селектор для получения пользователя
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

// Мемоизированный селектор для получения роли пользователя
export const selectUserRole = createSelector(
  [selectAuthState],
  (auth) => auth.role
);

// Мемоизированный селектор для получения статуса загрузки
export const selectLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

// Мемоизированный селектор для получения ошибки аутентификации
export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);
