import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauFormateurComponent } from './tableau-formateur.component';

describe('TableauFormateurComponent', () => {
  let component: TableauFormateurComponent;
  let fixture: ComponentFixture<TableauFormateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauFormateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
