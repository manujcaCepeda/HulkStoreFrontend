import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasRealizadasComponent } from './compras-realizadas.component';

describe('ComprasRealizadasComponent', () => {
  let component: ComprasRealizadasComponent;
  let fixture: ComponentFixture<ComprasRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasRealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
