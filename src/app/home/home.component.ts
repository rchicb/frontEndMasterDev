import { Component, OnInit } from '@angular/core';
import { ApiclienteService } from '../service/apicliente.service';
import { Credential } from '../model/Credential';  
import { Message } from '../model/Message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public data:any;
  public postData:any;
  public key:string;
  public sharesecret:string;
  public Columns:string[]=['id','nombre'];
  public postMessage:string;
  public postTags:string;
  public postXSignature:string;

  public getId:number;
  public getIdSignature:string;
  public getIdData:any;

  public getTag:string;
  public getTagSignature:string;
  public getTagData:any;


  constructor(    private apiClient:ApiclienteService) { }

  ngOnInit(): void {
  }
  getCredential(){
   const oCredential:Credential ={SharedSecret:this.sharesecret,UserKey:this.key};
     this.apiClient.getCredential(oCredential).subscribe(response=>{
       this.data=response;
     });
  }

  addMessage(){
    const oMessage:Message={Message1:this.postMessage,Tag:this.postTags}
    this.apiClient.addMessage(oMessage,this.postXSignature).subscribe(response=>{
      this.postData=response;
    });
    
  }

  getMessageId(){

      this.apiClient.getMessageId(this.getId,this.getIdSignature).subscribe(response=>{
        this.getIdData=response;
      });
   }

   getMessageTag(){

    this.apiClient.getMessageTag(this.getTag,this.getTagSignature).subscribe(response=>{
      this.getTagData=response;
    });
 }

}
