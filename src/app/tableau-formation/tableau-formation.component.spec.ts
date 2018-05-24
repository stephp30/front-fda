import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauFormationComponent } from './tableau-formation.component';

describe('TableauFormationComponent', () => {
  let component: TableauFormationComponent;
  let fixture: ComponentFixture<TableauFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
