import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAyudaComponent } from './list-ayuda.component';

describe('ListAyudaComponent', () => {
  let component: ListAyudaComponent;
  let fixture: ComponentFixture<ListAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
