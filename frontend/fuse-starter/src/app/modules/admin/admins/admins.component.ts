import { Observable, catchError, map, takeUntil, throwError } from 'rxjs';
import {
    ReactiveFormsModule,
    FormControl,
    FormsModule,
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
} from '@angular/forms';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { fuseAnimations } from '@fuse/animations';
import { MatButtonModule } from '@angular/material/button';
import { Admin, AdminsService } from './admins.service';
import { MatInputModule } from '@angular/material/input';
import {
    MatCheckboxChange,
    MatCheckboxModule,
} from '@angular/material/checkbox';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-admins',
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
    ],
    templateUrl: './admins.component.html',
    styleUrls: ['./admins.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class AdminsComponent implements OnInit {
    public isLoading = true;
    public searchInputControl = new FormControl('');
    admins: Admin[];
    selectedAdmin: Admin | null;
    selectedAdminForm: FormGroup<any>;
    flashMessage: String;
    passwordEdit: boolean = false;

    constructor(
        private adminsService: AdminsService,
        private formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private _detector: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.adminsService
            .getAdmins()
            .pipe(
                map((admins) => {
                    this.isLoading = false;
                    return admins;
                }),
                catchError((err, caught) => {
                    console.log(err);
                    this.isLoading = false;
                    return caught;
                })
            )
            .subscribe((admins) => {
                this.admins = admins;
                this._detector.markForCheck();
            });

        this.selectedAdminForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            fullName: ['', [Validators.required]],
            password: [''],
        });
    }

    createProduct(): void {
        const dialogRef = this._matDialog.open(AddAdminComponent);

        dialogRef.afterClosed().subscribe((admin: Admin) => {
            if (admin) {
                this.adminsService
                    .addAdmin(admin)
                    .pipe(
                        catchError(
                            (
                                err: HttpErrorResponse,
                                caught: Observable<Admin>
                            ) => {
                                if (err.status === 409) {
                                    this.flashMessage = 'error';
                                } else return caught;
                            }
                        )
                    )
                    .subscribe((addedAdmin: Admin) => {
                        this.admins.unshift(addedAdmin);
                        this._detector.markForCheck();
                    });
            }
        });
    }

    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Admin',
            message:
                'Are you sure you want to remove this admin? This action cannot be undone!',
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
                this.adminsService
                    .deleteAdmin(this.selectedAdmin.id)
                    .subscribe(() => {
                        const index = this.admins.findIndex(
                            (value) => value.id === this.selectedAdmin.id
                        );
                        this.admins.splice(index, 1);
                        this._detector.markForCheck();
                    });
            }
        });
    }

    updateSelectedProduct(): void {
        console.log(this.selectedAdmin);
        this.adminsService
            .updateAdmin(
                this.selectedAdmin.id,
                this.selectedAdminForm.getRawValue()
            )
            .pipe(
                catchError(
                    (err: HttpErrorResponse, caught: Observable<Admin>) => {
                        console.log(err);
                        if (err.status === 409) {
                            this.flashMessage = 'error';
                            this._detector.markForCheck();
                        } else return caught;
                    }
                )
            )
            .subscribe((updatedAdmin: Admin) => {
                const index = this.admins.findIndex(
                    (value) => value.id === updatedAdmin.id
                );
                this.admins[index] = updatedAdmin;
                this.selectedAdmin = updatedAdmin;
                this.flashMessage = 'success';
                this._detector.markForCheck();
            });
    }

    getErrorMessage(fieldName: string) {
        const field: AbstractControl<any, any> =
            this.selectedAdminForm.get(fieldName);
        if (field.hasError('required')) {
            return 'You must enter a value';
        }

        return field.hasError('email') ? 'Not a valid email' : '';
    }

    toggleDetails(admin) {
        if (this.selectedAdmin == admin) {
            this.closeDetails();
            return;
        }
        this.selectedAdmin = admin;
        this.selectedAdminForm.patchValue({ ...admin, password: undefined });
    }

    closeDetails(): void {
        this.selectedAdmin = null;
        this.passwordEdit = false;
    }

    togglePasswordEdit(event: MatCheckboxChange): void {
        this.passwordEdit = event.checked;
        const passwordField: AbstractControl<any, any> =
            this.selectedAdminForm.get('password');

        if (event.checked) {
            passwordField.setValidators([Validators.required]);
        } else {
            passwordField.setValidators(null);
        }

        passwordField.updateValueAndValidity();
    }

    trackByFn(admin: Admin): String {
        return admin.email;
    }
}
