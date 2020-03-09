import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  selectedTheme: string;
  themeList = environment.THEME_LIST;

  constructor() {
    this.checkAndSetActiveTheme();
  }

  ngOnInit() {
  }

  onThemeChange(theme: string): void {
    this.selectedTheme = theme;

    const body = document.getElementsByTagName('body')[0];
    const bodyClasses = body.classList;
    const bodyClassesToRemove = Array.from(bodyClasses).filter((item: string) => item.includes('-theme'));

    if (bodyClassesToRemove.length) {
      bodyClasses.remove(...bodyClassesToRemove);
    }

    body.classList.add(theme);
    this.setLocalStorageTheme(theme);
  }

  setLocalStorageTheme(selectedTheme: string): void {
    if (selectedTheme !== localStorage.getItem('active-theme')) {
      localStorage.setItem('active-theme', selectedTheme);
    }
  }

  checkAndSetActiveTheme(): void {
    const body = document.getElementsByTagName('body')[0];
    const activeTheme = localStorage.getItem('active-theme');
    const bodyClasses = body.classList;
    const bodyClassesTheme = Array.from(bodyClasses).filter((item: string) => item.includes('-theme'));

    if (activeTheme) {
      this.selectedTheme = activeTheme;
      body.classList.add(this.selectedTheme);
    } else {
      if (!bodyClassesTheme.length) {
        this.selectedTheme = this.themeList.find(theme => theme.isDefault === true).path;
        body.classList.add(this.selectedTheme);
      } else {
        this.selectedTheme = bodyClassesTheme[0];
      }
      this.setLocalStorageTheme(this.selectedTheme);
    }
  }
}
