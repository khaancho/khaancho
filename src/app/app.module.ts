import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { BrandComponent } from './header/navbar/brand/brand.component';
import { MenuComponent } from './header/navbar/menu/menu.component';
import { SearchComponent } from './header/navbar/search/search.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './content/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './content/main/main.component';
import { TopHeaderComponent } from './top-header/top-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ContentComponent,
    FooterComponent,
    SidebarComponent,
    BrandComponent,
    MenuComponent,
    SearchComponent,
    MainComponent,
    TopHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}
