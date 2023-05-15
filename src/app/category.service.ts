import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoryService {
    error = new BehaviorSubject<string | null>(null);
    loading = new BehaviorSubject<boolean>(true);

    constructor(private httpClient: HttpClient) { }

    fetchCategories(): Observable<string[]> {
        this.loading.next(true);
        return this.httpClient.get<FetchCategoriesResponse>('https://opentdb.com/api_category.php')
            .pipe(
                map(responseData => responseData.trivia_categories.map((category) => category.name)),
                finalize(() => this.loading.next(false)),
                catchError(error => {
                    this.error.next(error.message);
                    return throwError(() => new Error(error.message))
                }),
            )
    }
}
                