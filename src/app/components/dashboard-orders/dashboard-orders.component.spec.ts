import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrdersComponent } from './dashboard-orders.component';

describe('DashboardOrdersComponent', () => {
  let component: DashboardOrdersComponent;
  let fixture: ComponentFixture<DashboardOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
