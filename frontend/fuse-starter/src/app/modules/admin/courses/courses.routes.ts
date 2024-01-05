import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

export default [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: 'add',
        component: AddCourseComponent,
    },
    {
        path: ':id/update',
        component: UpdateCourseComponent,
    },
] as Routes;
