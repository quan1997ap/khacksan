import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSystemSettingsComponent } from './list-system-settings.component';

describe('ListSystemSettingsComponent', () => {
  let component: ListSystemSettingsComponent;
  let fixture: ComponentFixture<ListSystemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSystemSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSystemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
