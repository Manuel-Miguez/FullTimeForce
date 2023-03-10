import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnChanges {
  @Input('title') title: string = '';
  @Input('closeButton') closeButton: boolean = true;
  @Input('dataCSS') dataCSS: string = '';
  @Input('data') data: unknown = '';
  @Input('showModal') showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title'].currentValue) this.showModal = !this.showModal;
  }
}
