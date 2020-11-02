import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionSoloInstitucionComponent } from './informacion-solo-institucion.component';

describe('InformacionSoloInstitucionComponent', () => {
  let component: InformacionSoloInstitucionComponent;
  let fixture: ComponentFixture<InformacionSoloInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionSoloInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionSoloInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
