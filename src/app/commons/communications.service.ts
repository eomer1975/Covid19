import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMessage {
  id: number;
  command: CommunicationsCommands;
  payload: any;
}

export enum CommunicationsCommands {
  Empty,
  LoginSuccess,
  LoginError,
  Logout
}


@Injectable()
export class CommunicationsService {

  public static emptyMessage: IMessage = {
    command: CommunicationsCommands.Empty,
    id: 0,
    payload: null
  };

  private messageEndSource = new BehaviorSubject<IMessage>(CommunicationsService.emptyMessage);
  public messageEnd$ = this.messageEndSource.asObservable();

  constructor() { }


  public sendMessage(message: IMessage){
    this.messageEndSource.next(message);
  }
}
