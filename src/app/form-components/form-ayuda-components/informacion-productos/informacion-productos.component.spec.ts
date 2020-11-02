import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionProductosComponent } from './informacion-productos.component';

describe('InformacionProductosComponent', () => {
  let component: InformacionProductosComponent;
  let fixture: ComponentFixture<InformacionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
