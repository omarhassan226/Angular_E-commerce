import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditProductComponent } from './dashboard-edit-product.component';

describe('DashboardEditProductComponent', () => {
  let component: DashboardEditProductComponent;
  let fixture: ComponentFixture<DashboardEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardEditProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
