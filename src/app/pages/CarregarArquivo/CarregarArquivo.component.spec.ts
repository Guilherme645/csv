/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarregarArquivoComponent } from './CarregarArquivo.component';

describe('CarregarArquivoComponent', () => {
  let component: CarregarArquivoComponent;
  let fixture: ComponentFixture<CarregarArquivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarregarArquivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarregarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
