import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    constructor() { }

    getItem(key: string): any {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    setItem(key: string, model: any): boolean {
        if (model) {
            localStorage.setItem(key, JSON.stringify(model));
            return true;
        }
        return false;
    }

    removeItem(key: string): boolean {
        const data = localStorage.getItem(key);
        if (data) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    }

}