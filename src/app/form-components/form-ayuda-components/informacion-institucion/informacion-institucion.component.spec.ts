import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionInstitucionComponent } from './informacion-institucion.component';

describe('InformacionInstitucionComponent', () => {
  let component: InformacionInstitucionComponent;
  let fixture: ComponentFixture<InformacionInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
