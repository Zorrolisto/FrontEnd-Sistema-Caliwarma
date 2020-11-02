import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProducto2Component } from './tabla-producto2.component';

describe('TablaProducto2Component', () => {
  let component: TablaProducto2Component;
  let fixture: ComponentFixture<TablaProducto2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaProducto2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaProducto2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
