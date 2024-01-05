import { Observable, of } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Image } from './courses.service';

@Pipe({
    name: 'createImage',
    standalone: true,
})
export class createImagePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(image: Image, ...args: unknown[]): Observable<unknown> {
        if (image instanceof File) {
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(image);

            return new Observable((Observable) => {
                reader.onload = (e) => {
                    Observable.next(e.target.result);
                    Observable.complete();
                };
            });
        }

        return of(image);
    }
}
