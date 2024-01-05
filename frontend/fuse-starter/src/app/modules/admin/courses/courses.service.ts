import { messages } from './../../../../../../fuse-demo/src/app/mock-api/common/messages/data';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { courses } from 'app/mock-api/apps/academy/data';

import MarkdowIt from 'markdown-it';
import Highlight from 'markdown-it-highlightjs';
import Anchor from 'markdown-it-anchor';
import Attrs from 'markdown-it-attrs';
import TaskList from 'markdown-it-task-lists';
import Table from 'markdown-it-multimd-table';
import Sub from 'markdown-it-sub';
import Sup from 'markdown-it-sup';
import TableOfContents from 'markdown-it-table-of-contents';
import Alerts from 'markdown-it-alerts';

export type Image = string | File;

export type Course = {
    id?: number;
    title: string;
    description: string | null;
    content: string;
    image?: Image;
};

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    private md: MarkdowIt;
    private _courses: Course[] = [
        {
            id: 1,
            title: 'book 1',
            description: 'this book is for test',
            content: `
# title h1

## title h2

## title h3

[[toc]]

[google link](https://www.google.com)

![image link](https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg)

::: success
success messages
:::

::: danger
error messages
:::

\`\`\`java
public static void main(String[] args){
    System.out.println("hello world");
}
\`\`\`
            `,
        },
    ];
    private _count = courses.length;

    constructor() {
        this.md = new MarkdowIt();
        this.md
            .use(Highlight)
            .use(Attrs)
            .use(Anchor)
            .use(TaskList)
            .use(Sup)
            .use(Sub)
            .use(Table, {
                headerless: true,
                rowspan: true,
                multibody: false,
            })
            .use(TableOfContents, { includeLevel: [2, 3, 4] })
            .use(Alerts);
    }

    renderToHtml(text: string): string {
        return this.md.render(text);
    }

    getAllCourses(): Observable<Course[]> {
        return of(this._courses);
    }

    addCourse(course: Course): Observable<Course> {
        course.id = ++this._count;
        this._courses.push(course);
        return of(course);
    }

    deleteCourse(id: number): Observable<string> {
        const index = this._courses.findIndex((course) => course.id == id);
        if (index == -1) return throwError(() => 'not found');
        this._courses.splice(index, 1);
        return of('deleted successfully');
    }

    getCourse(id: number): Observable<Course> {
        return of(this._courses.find((course) => course.id == id));
    }

    updateCourse(id: number, course: Course): Observable<Course> {
        const index = this._courses.findIndex((course) => course.id == id);
        if (index == -1) return throwError(() => 'not found');
        this._courses[index] = { ...course, id };
        return of(this._courses[index]);
    }
}
