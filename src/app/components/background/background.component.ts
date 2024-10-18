import { Component } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { SettingsComponent } from '../settings/settings.component';

import { Type } from '@angular/core';
@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent {


constructor(private windowService: WindowService) {}

openSettingsWindow() {
 this.windowService.showComponent(SettingsComponent as any);
}


}

