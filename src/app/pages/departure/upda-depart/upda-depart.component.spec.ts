import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaDepartComponent } from './upda-depart.component';

describe('UpdaDepartComponent', () => {
  let component: UpdaDepartComponent;
  let fixture: ComponentFixture<UpdaDepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdaDepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdaDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
