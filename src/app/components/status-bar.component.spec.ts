import { TestBed, async } from '@angular/core/testing';
import { StatusBarComponent } from './status-bar.component';

describe('StatusBarComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                StatusBarComponent
            ],
        }).compileComponents();
    }));

    it('should render StatusBarComponent if param visible is true', () => {
        const fixture = TestBed.createComponent(StatusBarComponent);
        const component = fixture.componentInstance;
        component.visible = true;
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.ag-status-name-value')).toBeTruthy();
    });

    it('should render StatusBarComponent if param visible is false', () => {
        const fixture = TestBed.createComponent(StatusBarComponent);
        const component = fixture.componentInstance;
        component.visible = false;
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.ag-status-name-value')).toBeNull();
    });

    it(`should show correct count rows`, () => {
        const fixture = TestBed.createComponent(StatusBarComponent);
        const component = fixture.componentInstance;
        component.visible = true;
        component.count = 42;
        component.select = 84;
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('div.ag-status-name-value > span:nth-child(2)').textContent).toContain('42');
        expect(compiled.querySelector('div.ag-status-name-value > span:nth-child(4)').textContent).toContain('84');
    });
});
