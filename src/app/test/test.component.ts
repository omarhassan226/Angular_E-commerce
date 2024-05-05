import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent implements OnInit {
  switchTheme = new FormControl(false);
  @HostBinding('class') className = '';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';
  constructor(private overlay: OverlayContainer) {}
  ngOnInit(): void {
    this.switchTheme.valueChanges.subscribe((val) => {
      if (val === true) {
        this.overlay.getContainerElement().classList.add(this.darkClass);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClass);
      }
    });
  }
}
