import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletDepartComponent } from './delet-depart.component';

describe('DeletDepartComponent', () => {
  let component: DeletDepartComponent;
  let fixture: ComponentFixture<DeletDepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletDepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
