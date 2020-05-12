import { Component, OnDestroy } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'app-loading-overlay',
    template: `
       <div class="select" (click)='onHeaderClick()'>
          {{title}}
       </div>`,
})
export class CustomHeaderComponent implements AgRendererComponent, OnDestroy {
    private subscriptions: Subscription[] = [];
    private titleMap = {
        select: 'Select All',
        unselect: 'Unselect All'
    };

    public api: GridApi;
    public title = this.titleMap.select;

    public agInit(params: ICellRendererParams): void {
        this.api = params.api;
        this.subscriptions.push(
            fromEvent(params.api, 'selectionChanged')
                .subscribe(() => {
                    this.isAllSelected() ? this.title = this.titleMap.unselect : this.title = this.titleMap.select;
                })
        );
    }

    private isAllSelected(): boolean {
        const selectedCount = this.api.getSelectedRows().length;
        const allCount = this.api.getDisplayedRowCount();
        return selectedCount === allCount;
    }

    public onHeaderClick(): void {
        this.isAllSelected() ? this.api.deselectAll() : this.api.selectAll();
    }

    public refresh(): boolean {
        return false;
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
