import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import debounce from 'debounce';
import { SafeHtmlPipe } from '../safe-html.pipe';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Course, CoursesService, Image } from '../courses.service';

@Component({
    selector: 'app-add-course',
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
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
    isLoading: boolean = true;
    image?: Image;
    preview: string;

    addForm: FormGroup<any>;

    render = debounce(this.__render, 200);

    constructor(
        private service: CoursesService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.addForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            content: ['', [Validators.required]],
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

    addCourse() {
        const course: Course = this.addForm.getRawValue();

        if (this.image) course.image = this.image;

        this.service.addCourse(course).subscribe(this.goBack.bind(this));
    }
}
