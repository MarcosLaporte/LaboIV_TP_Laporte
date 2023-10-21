import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiOrLoComponent } from './hi-or-lo.component';

describe('HiOrLoComponent', () => {
  let component: HiOrLoComponent;
  let fixture: ComponentFixture<HiOrLoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiOrLoComponent]
    });
    fixture = TestBed.createComponent(HiOrLoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
