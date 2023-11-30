import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CompanyStorePage } from './company-store.page';

describe('CompanyStorePage', () => {
    let component: CompanyStorePage;
    let fixture: ComponentFixture<CompanyStorePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CompanyStorePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(CompanyStorePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
