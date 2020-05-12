import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { StatusBarComponent } from './components/status-bar.component';
import { CustomHeaderComponent } from './components/custom-header.component';

@NgModule({
    declarations: [
        AppComponent,
        StatusBarComponent,
        CustomHeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AgGridModule.withComponents([
            StatusBarComponent,
            CustomHeaderComponent
        ])
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
