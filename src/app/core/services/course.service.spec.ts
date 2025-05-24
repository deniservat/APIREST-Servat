import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Course } from 'app/featured/dashboard/courses/interfaces/courses';
import { environment } from 'environments/environment';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: '1', title: 'Angular Basics', description: 'Intro to Angular' },
    { id: '2', title: 'Advanced TypeScript', description: 'Deep dive into TS' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses and update subjects', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should add a course and update subjects', () => {
    const newCourse: Course = {
        id: '3',
        title: 'RxJS in Depth',
        description: 'Reactive programming with RxJS'
      };

    service['\u005f\u0063ourses'] = [...mockCourses]; // hack para setear cursos privados

    service.addCourse(newCourse).subscribe((course) => {
      expect(course).toEqual(newCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('POST');
    req.flush(newCourse);
  });

  it('should return a course by title', (done) => {
    service['\u005f\u0063ourses'] = mockCourses;

    service.getByTitle('Angular Basics').subscribe((course) => {
      expect(course.title).toBe('Angular Basics');
      done();
    });
  });

  it('should return error if course not found by title', (done) => {
    service['\u005f\u0063ourses'] = mockCourses;

    service.getByTitle('Nonexistent').subscribe({
      next: () => fail('Should not emit a value'),
      error: (err) => {
        expect(err).toBe('Course not found');
        done();
      },
    });
  });

  it('should edit a course and update subjects', () => {
    const updatedCourse: Course = {
        id: '1',
        title: 'Angular Updated',
        description: 'Updated Angular content'
      };
    service['\u005f\u0063ourses'] = [...mockCourses];

    service.editCourse('1', updatedCourse).subscribe((course) => {
      expect(course).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCourse);
  });

  it('should delete a course and update subjects', () => {
    service['\u005f\u0063ourses'] = [...mockCourses];

    service.deleteCourse('1').subscribe((deletedId) => {
      expect(deletedId).toBe('1');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should resolve courses as a promise', async () => {
    service['\u005f\u0063ourses'] = [...mockCourses];
    const result = await service.getCoursesPromise();
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('Angular Basics');
  });
});
