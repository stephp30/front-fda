import { TableauFluxComponent } from './flux.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('FluxComponent', () => {
  let component: TableauFluxComponent;
  let fixture: ComponentFixture<TableauFluxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauFluxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauFluxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
