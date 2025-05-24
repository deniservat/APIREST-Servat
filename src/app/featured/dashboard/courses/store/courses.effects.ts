import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesActions } from './courses.actions';
import { catchError, map } from 'rxjs';
import { CoursesService } from '../../../../core/services/courses.service';
import { concatMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CoursesEffects {
  loadCourses$;
  addCourse$;
  deleteCourse$;
  editCourse$;

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {
    this.loadCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.loadCourses),
        concatMap(() =>
          this.coursesService.getCourses().pipe(
            map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
            catchError((error) =>
              of(CoursesActions.loadCoursesFailure({ error }))
            )
          )
        )
      )
    );
    this.addCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.addCourse),
        concatMap((action) =>
          this.coursesService.addCourse(action.course).pipe(
            map((newCourse) =>
              CoursesActions.addCourseSuccess({ course: newCourse })
            ),
            catchError((error) =>
              of(CoursesActions.addCourseFailure({ error }))
            )
          )
        )
      )
    );
    this.deleteCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.deleteCourse),
        concatMap((action) =>
          this.coursesService.deleteCourse(action.id).pipe(
            map(() => CoursesActions.deleteCourseSuccess({ id: action.id })),
            catchError((error) =>
              of(CoursesActions.deleteCourseFailure({ error }))
            )
          )
        )
      )
    );

    this.editCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.editCourse),
        concatMap(({ id, course }) =>
          this.coursesService.editCourse(id, course).pipe(
            map((updatedCourse) =>
              CoursesActions.editCourseSuccess({ id: updatedCourse.id, course: updatedCourse })
            ),
            catchError((error) => of(CoursesActions.editCourseFailure({ error })))
          )
        )
      )
    );
  }    
}