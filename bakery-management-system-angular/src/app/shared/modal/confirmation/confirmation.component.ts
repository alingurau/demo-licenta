import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {
  @Input() buttonIcon = 'fa fa-trash';
  @Input() buttonColor = 'warn';
  @Input() buttonSize = 'btn-sm';
  @Input() modalTitle = 'Are you sure?';
  @Input() modalConfirmationText = 'Do you really want to delete this record? This process cannot be undone!';
  @Input() modalIcon = 'fa fa-times-circle-o';
  @Input() modalIconColor = 'color-danger';
  @Input() modalIconSize = 'fa-5x';
  @Output() modalAction: EventEmitter<any> = new EventEmitter();

  private modalConfirmation: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {
  }

  openModal(content) {
    this.modalConfirmation = this.modalService.open(content);
  }

  actionModal() {
    this.modalAction.emit();
    this.modalConfirmation.close();
  }
}
