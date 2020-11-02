import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInstitucionesComponent } from './dialog-instituciones.component';

describe('DialogInstitucionesComponent', () => {
  let component: DialogInstitucionesComponent;
  let fixture: ComponentFixture<DialogInstitucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInstitucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInstitucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
