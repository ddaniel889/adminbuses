import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDepartComponent } from './new-depart.component';

describe('NewDepartComponent', () => {
  let component: NewDepartComponent;
  let fixture: ComponentFixture<NewDepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
