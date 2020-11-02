import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInstitucionComponent } from './tabla-institucion.component';

describe('TablaInstitucionComponent', () => {
  let component: TablaInstitucionComponent;
  let fixture: ComponentFixture<TablaInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
