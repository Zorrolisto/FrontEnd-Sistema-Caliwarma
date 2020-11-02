import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInstitucionComponent } from './form-institucion.component';

describe('FormInstitucionComponent', () => {
  let component: FormInstitucionComponent;
  let fixture: ComponentFixture<FormInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
