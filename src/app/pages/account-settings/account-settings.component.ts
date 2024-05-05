import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',

})
export class AccountSettingsComponent implements OnInit {

  // Especifica el tipo aquí
  constructor(private settingService: SettingsService) { }
  ngOnInit(): void {
    this.settingService.checkCurrentTheme()
  }

  changeTheme(theme: string) {

    this.settingService.changeTheme(theme)

  }


}
