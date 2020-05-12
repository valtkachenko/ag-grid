import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';
import { ItemInterface } from './interfaces/youtube.interface';
import { StatusBarComponent } from './components/status-bar.component';
import {
    ColDef,
    ColumnApi,
    GetContextMenuItemsParams,
    GridApi,
    ICellRendererParams,
} from 'ag-grid-community';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { CustomHeaderComponent } from './components/custom-header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private subscriptions: Subscription[] = [];

    public title = 'ag-Grid';
    public rowData: ItemInterface[];
    public statusBar: any = {
        statusPanels: [
            {
                statusPanel: 'statusBarComponent',
                key: 'statusBarCompKey',
            },
        ],
    };
    public frameworkComponents: any = {
        statusBarComponent: StatusBarComponent,
        customHeaderComponent: CustomHeaderComponent,
    };
    public defaultColDef = {
        editable: false,
        sortable: true,
        filter: false,
        flex: 1,
    };
    public modules: any[] = [ClipboardModule, AllCommunityModules];
    public columnDefs: ColDef[] = [
        {
            colId: 'checkBoxId',
            checkboxSelection: true,
            maxWidth: 100,
            menuTabs: [],
            hide: true,
            sortable: true,
            headerComponent: 'customHeaderComponent'
        },
        {
            headerName: 'Video Title',
            field: 'title',
            cellRenderer: (params: ICellRendererParams) => {
                return `<a href="https://www.youtube.com/watch?v=${params.data.videoId}" target="_blank">${params.value}</a>`;
            },
            sortable: true,
            resizable: true,
            menuTabs: []
        },
        {
            headerName: 'Description',
            field: 'description',
            sortable: true,
            resizable: true,
            menuTabs: []
        },
        {
            headerName: 'Published on',
            field: 'publishedAt',
            sortable: true,
            resizable: true,
            menuTabs: []
        },
        {
            headerName: 'Thumbnails', field: 'thumbnails',
            cellRenderer: (params: ICellRendererParams) => {
                return `<img src="${params.value}" alt="">`;
            },
            resizable: false,
            sortable: false,
            menuTabs: []
        }
    ];

    constructor(private apiService: ApiService) {
    }

    public onGridReady(params: ICellRendererParams): void {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.subscriptions.push(
            this.apiService.getList().subscribe((data) => this.rowData = data)
        );
    }

    public getContextMenuItems(params: GetContextMenuItemsParams) {
        if (params.column.getColId() !== 'title') {
            return;
        }

        return [
            {
                name: 'Open in new tab',
                action: () => {
                    window.open(`https://www.youtube.com/watch?v=${params.node.data.videoId}`);
                },
            },
            'copy',
            'paste',
            'copyWithHeaders',
        ];
    }

    public toggleStatusBarComp(): void {
        const visible = this.gridColumnApi.getColumn('checkBoxId').isVisible();

        if (visible) {
            this.gridApi.deselectAll();
        }

        this.gridColumnApi.setColumnVisible('checkBoxId', !visible);

        // possible an error in type definition of ag-grid
        const statusBarComponent = this.gridApi.getStatusPanel('statusBarCompKey') as any;
        let componentInstance = statusBarComponent;
        if (statusBarComponent.getFrameworkComponentInstance) {
            componentInstance = statusBarComponent.getFrameworkComponentInstance();
        }
        componentInstance.setVisible(!componentInstance.isVisible());
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
