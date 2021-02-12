import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldsetModule, } from 'primeng/fieldset';
import { } from 'primeng/';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { CalendarModule } from 'primeng/calendar';
import { AppService } from './app.service';
import { AppConfigUrl } from './app.config';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MultiSelectModule} from 'primeng/multiselect';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgApexchartsModule } from "ng-apexcharts";
import {SidebarModule} from 'primeng/sidebar';
import { StockPriceComponent } from './components/stock-price/stock-price.component';
import {TimelineModule} from 'primeng/timeline';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    StockPriceComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MessagesModule,
    MessageModule,
    TimelineModule,
    SidebarModule,
    NgApexchartsModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    AutoCompleteModule,
    AccordionModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    BreadcrumbModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    TabViewModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    FormsModule,
    CalendarModule

  ],
  providers: [MessageService, AppService,AppConfigUrl],
  bootstrap: [AppComponent]
})
export class AppModule { }
