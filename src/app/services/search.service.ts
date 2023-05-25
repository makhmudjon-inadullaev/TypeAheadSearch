import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, debounceTime, distinctUntilChanged, exhaustMap, map, of, tap, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SearchService {
    search = new BehaviorSubject<LastResultCache>(this.defaults)
    searchError = new BehaviorSubject<string | null>(null)
    loading = new BehaviorSubject<boolean>(false)

    constructor(private httpClient: HttpClient) {}

    get getResults(): Observable<string[]> {
        return this.search.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(query => {
                this.loading.next(true)
                localStorage.setItem('query', JSON.stringify({ ...query, status: 'inactive' }))
            }),
            exhaustMap(({ query, category, status }) => {
                if(status === 'active') {
                    return this.httpClient.get<FetchSearchResponse>(`https://en.wikipedia.org/w/rest.php/v1/search/page?limit=5&q=${query}:${category}`)
                }
                return of({ pages: [] })
            }),
            tap(() => this.loading.next(false)),
            map(response => response.pages.map(page => page.title)),
            catchError(error => {
                this.searchError.next(error.message)
                return throwError(() => new Error(error.message))
            }),
        )
    }

    cacheQuery(data: { query: string, category: string }) {
        localStorage.setItem('query', JSON.stringify({ ...data, status: 'inactive' }))
    }

    get defaults(): LastResultCache {
        return JSON.parse(localStorage.getItem('query') || JSON.stringify({
            query: '',
            status: 'inactive',
            category: ''
        }))
    }
}