import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { asyncData, asyncError } from "src/testing/async-observable-helpers";
import { SearchService } from "./search.service";

class FakeLocalStorage implements Storage {
    private storage: { [key: string]: string } = {};
  
    get length(): number {
      return Object.keys(this.storage).length;
    }
  
    getItem(key: string): string | null {
      return this.storage[key] || null;
    }
  
    setItem(key: string, value: string): void {
      this.storage[key] = value;
    }
  
    removeItem(key: string): void {
      delete this.storage[key];
    }
  
    clear(): void {
      this.storage = {};
    }
  
    key(index: number): string | null {
      const keys = Object.keys(this.storage);
      return index < keys.length ? keys[index] : null;
    }
  }

describe('SearchService', () => {
  let service: SearchService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new SearchService(httpClientSpy);
  });

  it('Service has initial values', () => {
    expect(service.searchError.value).toBeNull();
    expect(service.loading.value).toBeFalse();
    expect(service.search.value).toEqual(service.defaults);
  });

  it('Should return expected search results when we have search query (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData({ pages: [] }));
    service.search.next({
        query: 'test',
        category: 'test-category',
        status: 'active'
    })
    service.getResults.subscribe({
        next: () => {
            expect(httpClientSpy.get.calls.count())
            .withContext('called once')
            .toBe(1);
            done();
        },
        error: done.fail
    });
  });

  it('Should return expected search results when we dont have search query (HttpClient not called)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData({ pages: [] }));
    service.getResults.subscribe({
        next: () => {
            expect(httpClientSpy.get.calls.count())
            .withContext('no calls')
            .toBe(0);
            done();
        },
        error: done.fail
    });
  });
})