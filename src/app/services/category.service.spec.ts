import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CategoryService } from "./category.service";
import { asyncData, asyncError } from "src/testing/async-observable-helpers";

describe('CategoryService', () => {
  let service: CategoryService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CategoryService(httpClientSpy);
  });

  it('Service has initial values', () => {
    expect(service.error.value).toBeNull();
    expect(service.loading.value).toBeTrue();
  });

  it('Should return expected categories (HttpClient called once)', (done: DoneFn) => {
    const expectedCategories: string[] = ['General Knowledge', 'Entertainment: Books', 'Entertainment: Film'];
    httpClientSpy.get.and.returnValue(asyncData({ trivia_categories: expectedCategories.map((name, id) => ({ name, id }))}));
    service.fetchCategories().subscribe({
        next: categories => {
            expect(categories).withContext('Expected Categories').toEqual(expectedCategories, 'expected categories')
            done();
        },
        error: done.fail
    })
     expect(httpClientSpy.get.calls.count())
      .withContext('called once')
      .toBe(1);
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: '404 Not Found',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
    service.fetchCategories().subscribe({
      next: () => done.fail('expected an error, not categories'),
      error: error  => {
        expect(error.message).toContain('404 Not Found');
        done();
      }
    });
  });
})