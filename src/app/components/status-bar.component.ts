import { Component, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { AgRendererComponent } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';

@Component({
    selector: 'app-status-bar-component',
    template: `
       <div class="ag-status-name-value" *ngIf="visible">
          <span>Row Count&nbsp;:</span>
          <span class="ag-status-name-value-value"> {{count}}</span> &nbsp;
          <span>Row Select&nbsp;:</span>
          <span class="ag-status-name-value-value"> {{select}}</span>
       </div>
    `,
})

export class StatusBarComponent implements AgRendererComponent, OnDestroy {
    private subscriptions: Subscription[] = [];

    public count = 0;
    public select = 0;
    public visible = false;
    public api: GridApi;

    public agInit(params: ICellRendererParams): void {
        this.api = params.api;
        this.subscriptions.push(
            fromEvent(params.api, 'rowDataChanged').subscribe(
                () => this.count = params.api.getDisplayedRowCount()
            ),

            fromEvent(params.api, 'selectionChanged').subscribe(
                () => this.select = params.api.getSelectedRows().length
            ),
        );
    }

    public setVisible(visible: boolean): void {
        this.visible = visible;
    }

    public isVisible(): boolean {
        return this.visible;
    }

    public refresh(): boolean {
        return false;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
