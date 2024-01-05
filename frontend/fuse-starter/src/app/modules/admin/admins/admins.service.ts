import { Observable, delay, of, timeout, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Admin = {
    id: number;
    email: String;
    password: String;
    fullName: String;
};

@Injectable({
    providedIn: 'root',
})
export class AdminsService {
    private _api: string = 'http://localhost:8080/api/v1';
    private _admin_api: string = `${this._api}/admins`;

    constructor(private http: HttpClient) {}

    getAdmins(): Observable<Admin[]> {
        return this.http.get<Admin[]>(this._admin_api);
    }

    updateAdmin(id: number, admin: Admin): Observable<Admin> {
        return this.http.put<Admin>(`${this._admin_api}/${id}`, admin);
    }

    addAdmin(admin: Admin) {
        return this.http.post<Admin>(`${this._admin_api}`, admin);
    }

    deleteAdmin(id: number) {
        return this.http.delete<Admin>(`${this._admin_api}/${id}`);
    }
}
