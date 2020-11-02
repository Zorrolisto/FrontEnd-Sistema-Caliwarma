import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductosComponent } from './dialog-productos.component';

describe('DialogProductosComponent', () => {
  let component: DialogProductosComponent;
  let fixture: ComponentFixture<DialogProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
