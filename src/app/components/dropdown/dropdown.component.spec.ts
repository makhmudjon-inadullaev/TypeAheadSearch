import { TestBed } from '@angular/core/testing';
import { AppDropdown } from './dropdown.component';

describe('AppDropdownComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [],
    declarations: [AppDropdown]
  }));

  it('Component should be created', () => {
    const fixture = TestBed.createComponent(AppDropdown);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Component should have initial values', () => {
    const fixture = TestBed.createComponent(AppDropdown);
    const component = fixture.componentInstance;
    expect(component.selected).toBe('Select');
    expect(component.disabled).toBe(false);
    expect(component.options).toEqual([]);
    expect(component.expanded).toBe(false);
  });

  it('Testing when one of options is selected, when collapsed', () => {
    const fixture = TestBed.createComponent(AppDropdown);
    const component = fixture.componentInstance;
    const testOption = 'testOption';
    component.expanded = false
    component.handleSelect(testOption);
    expect(component.selected).toBe('Select');
    expect(component.disabled).toBe(false);
    expect(component.options).toEqual([]);
    expect(component.expanded).toBe(false);
  })

  it('Testing when one of options is selected, when expanded', () => {
    const fixture = TestBed.createComponent(AppDropdown);
    const component = fixture.componentInstance;
    spyOn(component.onselect, 'emit');
    spyOn(component.onblur, 'emit');
    const testOption = 'testOption';
    component.expanded = true
    component.handleSelect(testOption);
    expect(component.selected).toBe(testOption);
    expect(component.onselect.emit).toHaveBeenCalledWith(testOption);
    expect(component.onblur.emit).toHaveBeenCalled();
    expect(component.expanded).toBe(false);
  })
})