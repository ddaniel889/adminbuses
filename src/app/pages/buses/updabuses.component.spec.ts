import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdabusesComponent } from './updabuses.component';

describe('UpdabusesComponent', () => {
  let component: UpdabusesComponent;
  let fixture: ComponentFixture<UpdabusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdabusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdabusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
