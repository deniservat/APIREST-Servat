import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState, adapter } from './courses.reducer';

// 1. Feature selector
export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

// 2. Adapter selectors con el selector del feature para el estado parcial
const { selectAll } = adapter.getSelectors(selectCoursesState);

// 3. Selectors
export const selectCourses = selectAll;

export const selectIsLoading = createSelector(
  selectCoursesState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectCoursesState,
  (state) => state.error
);
