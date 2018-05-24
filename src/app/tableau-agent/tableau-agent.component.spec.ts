import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauAgentComponent } from './tableau-agent.component';

describe('TableauAgentComponent', () => {
  let component: TableauAgentComponent;
  let fixture: ComponentFixture<TableauAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
