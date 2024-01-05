import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, CoursesService, Image } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import debounce from 'debounce';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SafeHtmlPipe } from '../safe-html.pipe';

@Component({
    selector: 'app-update-course',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        NgxDropzoneModule,
        SafeHtmlPipe,
    ],
    templateUrl: './update-course.component.html',
    styleUrls: ['../add-course/add-course.component.scss'],
})
export class UpdateCourseComponent {
    id: number;
    isLoading: boolean = true;
    image?: Image;
    preview: string;

    updateForm: FormGroup<any>;

    render = debounce(this.__render, 200);

    constructor(
        private service: CoursesService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.id = Number(params['id']);
            this.service.getCourse(this.id).subscribe((course) => {
                if (!course) return this.goBack();

                this.updateForm = this.formBuilder.group({
                    title: [course.title, [Validators.required]],
                    description: [course.description, [Validators.required]],
                    content: [course.content, [Validators.required]],
                });

                this.__render(course.content);

                this.image = course.image;
            });
        });
    }

    private __render(value) {
        this.preview = this.service.renderToHtml(value);
    }

    goBack() {
        this.router.navigate(['/courses']);
    }

    onSelect(event: any) {
        if ((event.addedFiles[0].type as string).startsWith('image/'))
            this.image = event.addedFiles[0];
    }

    onRemove() {
        this.image = undefined;
    }

    onInput($event: InputEvent) {
        const value = ($event.target as HTMLTextAreaElement).value;
        this.render(value);
    }

    updateCourse() {
        const course: Course = this.updateForm.getRawValue();
        if (this.image) course.image = this.image;
        this.service
            .updateCourse(this.id, course)
            .subscribe(this.goBack.bind(this));
    }
}
