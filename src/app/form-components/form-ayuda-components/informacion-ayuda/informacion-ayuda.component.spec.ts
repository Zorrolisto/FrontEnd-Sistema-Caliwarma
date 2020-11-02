import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAyudaComponent } from './informacion-ayuda.component';

describe('InformacionAyudaComponent', () => {
  let component: InformacionAyudaComponent;
  let fixture: ComponentFixture<InformacionAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
