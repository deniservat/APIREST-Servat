import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Course } from '../interfaces/courses';

export const CoursesActions = createActionGroup({
  source: 'Courses/API',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: string }>(),
    'Add Course': props<{ course: Course }>(),
    'Add Course Success': props<{ course: Course }>(),
    'Add Course Failure': props<{ error: string }>(),
    'Delete Course': props<{ id: string }>(),
    'Delete Course Success': props<{ id: string }>(),
    'Delete Course Failure': props<{ error: string }>(),
    'Edit Course': props<{ id: string; course: Course }>(),
    'Edit Course Success': props<{ id: string; course: Course }>(),
    'Edit Course Failure': props<{ error: any }>(),
    'Update Course': props<{ course: Course }>(),
    'Update Course Success': props<{ course: Course }>(),
    'Update Course Failure': props<{ error: any }>(),

    // 'Clear Courses': emptyProps(),
  },
});
