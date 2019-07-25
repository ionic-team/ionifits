import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-implementation-modal',
  templateUrl: './implementation-modal.page.html',
  styleUrls: ['./implementation-modal.page.scss'],
})
export class ImplementationModalPage implements OnInit {

  @Input() description: string;
  @Input() uiComps: string[];
  @Input() nativeFeatures: string[];

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  async closeModal() {
    await this.modalController.dismiss(null);
  }
}
