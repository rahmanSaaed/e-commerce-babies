import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-settings',
  templateUrl: './tab-settings.component.html',
  styleUrls: ['./tab-settings.component.scss']
})
export class TabSettingsComponent implements OnInit {
  @Input() showSettinsTab:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
