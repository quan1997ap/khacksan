import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSystemSettingComponent } from './detail-system-setting.component';

describe('DetailSystemSettingComponent', () => {
  let component: DetailSystemSettingComponent;
  let fixture: ComponentFixture<DetailSystemSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSystemSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSystemSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
