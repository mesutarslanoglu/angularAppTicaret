import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    private readonly apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getCategories(): Observable<CategoryModel[]> {
        return this.http.get(`${this.apiUrl}Categories`).pipe(
            map((response: CategoryModel[]) => response)
        );
    }

}