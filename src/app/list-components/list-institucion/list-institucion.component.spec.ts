import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstitucionComponent } from './list-institucion.component';

describe('ListInstitucionComponent', () => {
  let component: ListInstitucionComponent;
  let fixture: ComponentFixture<ListInstitucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInstitucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
