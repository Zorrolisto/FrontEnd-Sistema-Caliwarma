import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarInstitucionComponent } from './buscar-institucion.component';

describe('BuscarInstitucionComponent', () => {
  let component: BuscarInstitucionComponent;
  let fixture: ComponentFixture<BuscarInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
