import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Course, CoursesService, Image } from './courses.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { createImagePipe } from './create-image.pipe';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatProgressBarModule,
        createImagePipe,
    ],
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
    public isLoading = true;
    public searchInputControl = new FormControl('');
    courses: Course[];
    flashMessage: String;
    passwordEdit: boolean = false;

    constructor(
        private coursesService: CoursesService,
        private router: Router,
        private route: ActivatedRoute,
        private fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.coursesService.getAllCourses().subscribe((courses) => {
            this.courses = courses;
            this.isLoading = false;
        });
    }

    addCourse() {
        this.router.navigate(['add'], { relativeTo: this.route });
    }

    updateCourse(id: number) {
        this.router.navigate([id, 'update'], { relativeTo: this.route });
    }

    deleteCourse(id: number) {
        const confirmation = this.fuseConfirmationService.open({
            title: 'Delete Course',
            message:
                'Are you sure you want to remove this course? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                this.coursesService.deleteCourse(id).subscribe((message) => {
                    const index = this.courses.findIndex(
                        (course) => course.id == id
                    );
                    if (index > -1) this.courses.splice(index, 1);
                });
            }
        });
    }
}
