import { TestBed } from '@angular/core/testing';
import { TypeaheadSearch } from './typeahead-search.component';
import { CategoryService } from '../services/category.service';
import { SearchService } from '../services/search.service';
import { AppDropdown } from '../components/dropdown/dropdown.component';

describe('TypeaheadSearchComponent', () => {
  let services: {
    categoryService: {
      fetchCategoriesSpy: jasmine.Spy;
      loadingSpy: jasmine.Spy;
      errorSpy: jasmine.Spy;
    },
    searchService: {
      searchSpy: jasmine.Spy;
      cacheQuerySpy: jasmine.Spy;
      defaultsSpy: jasmine.Spy;
      loadingSpy: jasmine.Spy;
      searchErrorSpy: jasmine.Spy;
      getResultsSpy: jasmine.Spy;
    }
  } = {
    categoryService: {
      fetchCategoriesSpy: jasmine.createSpy(),
      loadingSpy: jasmine.createSpy(),
      errorSpy: jasmine.createSpy(),
    },
    searchService: {
      searchSpy: jasmine.createSpy(),
      cacheQuerySpy: jasmine.createSpy(),
      defaultsSpy: jasmine.createSpy(),
      loadingSpy: jasmine.createSpy(),
      searchErrorSpy: jasmine.createSpy(),
      getResultsSpy: jasmine.createSpy(),
    }
  }

  beforeEach(() => {
    const categoryService = jasmine.createSpyObj(
      'CategoryService',
      ['fetchCategories'],
      {
        loading: { subscribe: jasmine.createSpy() },
        error: { subscribe: jasmine.createSpy() }
      }
    )
    const searchService = jasmine.createSpyObj(
      'SearchService',
      ['cacheQuery'],
      {
        defaults: {},
        search: { next: jasmine.createSpy() },
        loading: { subscribe: jasmine.createSpy() },
        searchError: { subscribe: jasmine.createSpy() },
        getResults: { subscribe: jasmine.createSpy() }
      }
    );
    services.categoryService.fetchCategoriesSpy = categoryService.fetchCategories.and.returnValue({ subscribe: () => {} });
    services.categoryService.loadingSpy = categoryService.loading.subscribe.and.returnValue({ subscribe: () => {} });
    services.categoryService.errorSpy = categoryService.error.subscribe.and.returnValue({ subscribe: () => {} });
    services.searchService.searchSpy = searchService.search.next.and.returnValue({ next: () => {} });
    services.searchService.cacheQuerySpy = searchService.cacheQuery.and.returnValue(() => {});
    services.searchService.loadingSpy = searchService.loading.subscribe.and.returnValue({ subscribe: () => {} });
    services.searchService.searchErrorSpy = searchService.searchError.subscribe.and.returnValue({ subscribe: () => {} });
    services.searchService.getResultsSpy = searchService.getResults.subscribe.and.returnValue({ subscribe: () => {} });

    TestBed.configureTestingModule({
      imports: [],
      declarations: [TypeaheadSearch, AppDropdown],
      providers: [
        { provide: CategoryService, useValue: categoryService },
        { provide: SearchService, useValue: searchService }
      ]
    })
  });

  it('Component should be created', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Component should have initial values', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    expect(component.categories).withContext('default no any categories').toEqual([]);
    expect(component.selectedCategory).withContext('default no categories must be selected').toEqual('');
    expect(component.categoryLoading).withContext('default categories are being loaded').toBeTrue();
    expect(component.error).withContext('default no any errors').toBeNull();
    expect(component.searchQuery).withContext('default no any search value').toEqual('');
    expect(component.searchLoading).withContext('default search must not be loaded').toBeFalse();
    expect(component.searchOptions).withContext('default no any search options').toEqual([]);
    expect(component.showSearchOptions).withContext('default search options will be hidden').toBeFalse();
  });

  it('Module initialization should subscribe CategoryService and SearchService', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    component.ngOnInit();
    expect(services.categoryService.fetchCategoriesSpy).toHaveBeenCalled();
    expect(services.categoryService.loadingSpy).toHaveBeenCalled();
    expect(services.categoryService.errorSpy).toHaveBeenCalled();
    expect(services.searchService.loadingSpy).toHaveBeenCalled();
    expect(services.searchService.searchErrorSpy).toHaveBeenCalled();
    expect(services.searchService.getResultsSpy).toHaveBeenCalled();
  })

  it('Testing when search button is clicked', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    component.handleSearchClick();
    expect(services.searchService.searchSpy).toHaveBeenCalled();
    expect(component.showSearchOptions).withContext('search options will be visible').toBeTrue();
  })

  it('Testing when one of search options is clicked', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    const searchInput = document.createElement('input') as HTMLInputElement;
    const searchInputFocusSpy = spyOn(searchInput, 'focus');
    const searchSelectedOption = 'Test option';
    component.handleSelect(searchSelectedOption, searchInput);
    expect(component.searchQuery).withContext('search value should be changed').toEqual(searchSelectedOption);
    expect(component.showSearchOptions).withContext('search options will be hidden').toBeFalse()
    expect(services.searchService.cacheQuerySpy).toHaveBeenCalled();
    expect(searchInputFocusSpy).toHaveBeenCalled();
  })

  it('Testing when one of categories selected', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    const categorySelected = 'Test category';
    component.onCategoryChange(categorySelected);
    expect(component.selectedCategory).withContext('category should be changed').toEqual(categorySelected);
  })

  it('Testing when we enter text on searchInput', () => {
    const fixture = TestBed.createComponent(TypeaheadSearch);
    const component = fixture.componentInstance;
    component.onInputChange();
    expect(component.showSearchOptions).withContext('search options will be visible').toBeTrue();
    expect(services.searchService.searchSpy).toHaveBeenCalled();
  })
})