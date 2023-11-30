import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { informationCircleOutline, easelOutline, keyOutline, lockClosedOutline, list, returnDownBack, tabletPortrait, addCircleOutline, grid, camera, document, briefcase, person, flash, layers } from "ionicons/icons";

@Component({
    selector: 'app-implementation-modal',
    templateUrl: './implementation-modal.page.html',
    styleUrls: ['./implementation-modal.page.scss'],
})
export class ImplementationModalPage {

    @Input() description: string;
    @Input() uiComps: UIComponent[];
    @Input() nativeFeatures: NativeFeature[];

    constructor(private modalController: ModalController) { 
        addIcons({ informationCircleOutline, easelOutline, keyOutline, lockClosedOutline, list, returnDownBack, tabletPortrait, addCircleOutline, grid, camera, document, briefcase, person, flash, layers });
    }

    async closeModal() {
        await this.modalController.dismiss(null);
    }
}

class UIComponent {
    name: string;
    icon: string;
    tag: string;
    description: string;
}

class NativeFeature {
    name: string;
    icon: string;
    runtime: string;
    description: string;
}
