import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../model/Response';
import { Credential } from '../model/Credential';
import { Message } from '../model/Message';

const httpOption={
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiclienteService {
  uriApi:string='https://localhost:44308/api/credential';
  uriMessage:string='https://localhost:44308/api/message';

  constructor(private _http:HttpClient) { }

  getClients():Observable<Response>{
    return this._http.get<Response>(this.uriApi);

  }

  getCredential(credential:Credential):Observable<Response>{
    return this._http.put<Response>(this.uriApi,credential,httpOption);
  }

  addMessage(oMessage:Message, Xsignature:string):Observable<Response>{

    const httpOption=this.getHeader(Xsignature);
    
    return this._http.post<Response>(this.uriMessage,oMessage,httpOption);

  }

  getMessageId(id:number,Xsignature:string):Observable<Response>{

    const httpOption=this.getHeader(Xsignature);
    return this._http.get<Response>(this.uriMessage+"/"+id,httpOption);
  }

  getMessageTag(tag:string,Xsignature:string):Observable<Response>{
    const httpOption=this.getHeader(Xsignature);
    return this._http.get<Response>(this.uriMessage+"?Tag="+tag,httpOption);
  }

  getHeader(Xsignature:string){
    const httpOption={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Signature':Xsignature
      })
    };
    return httpOption;
  }
}
