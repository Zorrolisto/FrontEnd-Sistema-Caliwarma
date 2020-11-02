import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAyudaComponent } from './tabla-ayuda.component';

describe('TablaAyudaComponent', () => {
  let component: TablaAyudaComponent;
  let fixture: ComponentFixture<TablaAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAyudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
