import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Output() clickToggle = new EventEmitter();

  ngOnInit(): void {}
  toggleHeader() {
    this.clickToggle.emit();
  }
}
