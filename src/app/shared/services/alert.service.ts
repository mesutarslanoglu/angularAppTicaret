import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {

    constructor() { }

    showCustomMessage(title: string, message: string, icon: SweetAlertIcon) {
        Swal.fire(title, message, icon);
    }

    showSuccessMessage() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'İşlem Başarılı',
            showConfirmButton: false,
            timer: 1500
        });
    }

    showErrorMessage() {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'İşlem Başarısız',
            showConfirmButton: false,
            timer: 1500
        });
    }

    showWarningMessage(message: string) {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 1500
        });
    }

}