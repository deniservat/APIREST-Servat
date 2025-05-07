import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/courses';
import { CoursesService } from '../../../../../core/services/courses.service';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})

export class DetailsComponent {
  course: Course| undefined; 
  isLoading: boolean = true;
  error: string | undefined;

  constructor(
    private CoursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    this.CoursesService.getByTitle(title!).subscribe({
      next:(course) => {
        this.isLoading = false;
        this.course = course;
        console.log(course);
      },
      error:(error) => {
        this.isLoading = false;
        console.log(error)
;      }
    })
  }
}

