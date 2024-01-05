import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuillEditorComponent } from 'ngx-quill';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        QuillEditorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAdminComponent implements OnInit {
    addForm: FormGroup<any>;

    constructor(
        private dialogRef: MatDialogRef<AddAdminComponent>,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.addForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    getErrorMessage(fieldName: string) {
        const field: AbstractControl<any, any> = this.addForm.get(fieldName);
        if (field.hasError('required')) {
            return 'You must enter a value';
        }

        return field.hasError('email') ? 'Not a valid email' : '';
    }

    close() {
        this.dialogRef.close();
    }

    add() {
        this.dialogRef.close(this.addForm.getRawValue());
    }
}
