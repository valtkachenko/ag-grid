import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StatusBarComponent } from './components/status-bar.component';
import { CustomHeaderComponent } from './components/custom-header.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ApiService } from './services/api.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
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
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'ag-Grid'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('ag-Grid');
    });

});
