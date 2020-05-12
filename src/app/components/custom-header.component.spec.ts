import { TestBed, async } from '@angular/core/testing';
import { CustomHeaderComponent } from './custom-header.component';
import { AgGridModule } from 'ag-grid-angular';

class SuperEventTarget extends EventTarget {
    constructor(public selectedRow,
                public displayedRow) {
        super();
    }

    selectAll = () => undefined;
    deselectAll = () => undefined;
    getSelectedRows = () => Array.from({length: this.selectedRow});
    getDisplayedRowCount = () => this.displayedRow;
}

describe('CustomHeaderComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CustomHeaderComponent,
            ],
            imports: [
                AgGridModule.withComponents()
            ],
        }).compileComponents();

    }));

    it(`should have as title 'Select All'`, () => {
        const fixture = TestBed.createComponent(CustomHeaderComponent);
        const component = fixture.componentInstance;

        expect(component.title).toEqual('Select All');
    });

    it(`should have as title 'Unselect All' if clicked`, (done) => {
        const fixture = TestBed.createComponent(CustomHeaderComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        const superApi = new SuperEventTarget(42, 42);
        const params = {api: superApi};

        spyOn(superApi, 'selectAll').and.callFake(() => {
            superApi.dispatchEvent(new Event('selectionChanged'));
            superApi.selectedRow = superApi.displayedRow;
        });

        spyOn(superApi, 'deselectAll').and.callFake(() => {
            superApi.dispatchEvent(new Event('selectionChanged'));
            superApi.selectedRow = 0;
        });

        // @ts-ignore
        component.agInit(params);
        component.onHeaderClick();

        expect(superApi.deselectAll).toHaveBeenCalled();
        expect(superApi.selectAll).not.toHaveBeenCalled();
        expect(component.title).toContain('Unselect All');
        done();
    });
});
