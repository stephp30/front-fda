import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauGradesComponent } from './tableau-grades.component';

describe('TableauGradesComponent', () => {
  let component: TableauGradesComponent;
  let fixture: ComponentFixture<TableauGradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauGradesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
