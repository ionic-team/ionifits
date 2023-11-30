import { Component } from '@angular/core';
import { addIcons } from "ionicons";
import { people, card, storefront, settings } from "ionicons/icons";

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    constructor() {
        addIcons({ people, card, storefront, settings });
    }
}
