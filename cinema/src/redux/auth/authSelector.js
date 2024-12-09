import { createSelector } from 'reselect';

export const selectAuthState = (state) => state.auth;

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectUserRole = createSelector(
  [selectAuthState],
  (auth) => auth.role
);

export const selectLoading = createSelector(
  [selectAuthState],
  (auth) => auth.loading
);

export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

// Прокси для удобства
export const selectAuthError = selectError;
export const selectAuthLoading = selectLoading;
