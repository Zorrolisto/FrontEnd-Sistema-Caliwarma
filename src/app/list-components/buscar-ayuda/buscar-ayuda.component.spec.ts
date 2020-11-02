import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAyudaComponent } from './buscar-ayuda.component';

describe('BuscarAyudaComponent', () => {
  let component: BuscarAyudaComponent;
  let fixture: ComponentFixture<BuscarAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
