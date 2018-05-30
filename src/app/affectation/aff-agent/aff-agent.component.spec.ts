import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffAgentComponent } from './aff-agent.component';

describe('AffAgentComponent', () => {
  let component: AffAgentComponent;
  let fixture: ComponentFixture<AffAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
