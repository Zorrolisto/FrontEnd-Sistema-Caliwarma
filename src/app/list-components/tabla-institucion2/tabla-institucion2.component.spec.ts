import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInstitucion2Component } from './tabla-institucion2.component';

describe('TablaInstitucion2Component', () => {
  let component: TablaInstitucion2Component;
  let fixture: ComponentFixture<TablaInstitucion2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInstitucion2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInstitucion2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
