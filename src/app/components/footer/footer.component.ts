import { Component, OnInit } from '@angular/core';
import { ThemeList, ThemeService } from '@app/@core/services/theme';
import { Path } from '@core/structs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  path = Path;
  theme = ThemeList;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  onClickChangeTheme(theme: ThemeList): void {
    this.themeService.setTheme(theme);
  }
}

