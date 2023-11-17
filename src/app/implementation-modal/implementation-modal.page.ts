import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-implementation-modal',
  templateUrl: './implementation-modal.page.html',
  styleUrls: ['./implementation-modal.page.scss'],
})
export class ImplementationModalPage {

  @Input() description: string;
  @Input() uiComps: UIComponent[];
  @Input() nativeFeatures: NativeFeature[];

  constructor(private modalController: ModalController) { }

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
