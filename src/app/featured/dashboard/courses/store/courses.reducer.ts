import { createFeature, createReducer, on, createFeatureSelector } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../interfaces/courses';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const coursesFeatureKey = 'courses';

export interface CoursesState extends EntityState<Course> {
  loading: boolean;
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialState: CoursesState = adapter.getInitialState({
  loading: false,
  isLoading: false,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses }) =>
    adapter.setAll(courses, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CoursesActions.addCourseSuccess, (state, { course }) =>
    adapter.addOne(course, state)
  ),

  on(CoursesActions.editCourseSuccess, (state, { id, course }) =>
    adapter.updateOne({ id, changes: course }, state)
  ),

  on(CoursesActions.deleteCourseSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),

  on(CoursesActions.updateCourse, (state) => ({
    ...state,
    loading: true,
  })),

  on(CoursesActions.updateCourseSuccess, (state, { course }) =>
    adapter.updateOne(
      { id: course.id, changes: course },
      { ...state, loading: false }
    )
  ),

  on(CoursesActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);




export const courseFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});
