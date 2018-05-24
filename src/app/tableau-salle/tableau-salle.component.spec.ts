import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauSalleComponent } from './tableau-salle.component';

describe('TableauSalleComponent', () => {
  let component: TableauSalleComponent;
  let fixture: ComponentFixture<TableauSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
