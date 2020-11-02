import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasDeAyudasComponent } from './lineas-de-ayudas.component';

describe('LineasDeAyudasComponent', () => {
  let component: LineasDeAyudasComponent;
  let fixture: ComponentFixture<LineasDeAyudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineasDeAyudasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasDeAyudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
