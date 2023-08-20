import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherElementComponent } from './other-element.component';

describe('OtherElementComponent', () => {
  let component: OtherElementComponent;
  let fixture: ComponentFixture<OtherElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
