import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeThingComponent } from './some-thing.component';

describe('SomeThingComponent', () => {
  let component: SomeThingComponent;
  let fixture: ComponentFixture<SomeThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SomeThingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SomeThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
