import { TestBed } from '@angular/core/testing';
import { ErrorAlertComponent } from './error.component';
import { NgIf } from '@angular/common';

describe('ErrorAlertComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [NgIf],
    declarations: [ErrorAlertComponent]
  }));

  it('Component should be created', () => {
    const fixture = TestBed.createComponent(ErrorAlertComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Component should have initial values', () => {
    const fixture = TestBed.createComponent(ErrorAlertComponent);
    const component = fixture.componentInstance;
    expect(component.error).toBeNull();
  });

  it('Component renders error message', () => {
    const fixture = TestBed.createComponent(ErrorAlertComponent);
    const component = fixture.componentInstance;
    const errorMessage = 'Unexpected error';
    component.error = errorMessage;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul[role=list]>li').textContent).toContain(errorMessage);
  });
})