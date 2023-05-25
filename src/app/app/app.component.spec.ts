import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TypeaheadSearch } from '../typeahead-search/typeahead-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppDropdown } from '../components/dropdown/dropdown.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    declarations: [AppComponent, TypeaheadSearch, AppDropdown]
  }));

  it('App should be created', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
})