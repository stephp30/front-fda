import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauIlotComponent } from './tableau-ilot.component';

describe('TableauIlotComponent', () => {
  let component: TableauIlotComponent;
  let fixture: ComponentFixture<TableauIlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauIlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauIlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
