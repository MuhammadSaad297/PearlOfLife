import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/services/base.service";

@Injectable({
    providedIn: 'root'
})
export class KeyHolderService extends BaseService {
    private baseUrl = 'http://localhost:3000'; // Replace with your API URL

    getKeyHolders(optionalParams: any = ''): Observable<any> {
        return this.get(`${this.baseUrl}/key-holders?${optionalParams ? optionalParams : ''}`);
    }
    
    getKeyHolderById(id: string): Observable<any> {
        return this.get(`${this.baseUrl}/key-holders/${id}`);
    }

    // addUpdateKeyHolder(payload: any, id?: string): Observable<any> {
    //     const url =  `${this.baseUrl}/key-holders${id ? '/'+id : ''}`
    //     return id && this.put(url, payload) || this.post(url, payload);
    // }

    addKeyHolder(file: File, body?: any): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        if(body) formData.append('text', JSON.stringify(body));
        return this.post(`${this.baseUrl}/key-holders`, formData);
    }

    deleteKeyHolder(id: string): Observable<any> {
        return this.delete(`${this.baseUrl}/key-holders/${id}`);
    }
    
}