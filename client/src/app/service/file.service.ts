import { CollaborativeEditArgs, Spreadsheet } from '@syncfusion/ej2-angular-spreadsheet';
import { environment } from './../env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  collectionGroup,
} from '@angular/fire/firestore';
import { File } from '../model/file.model';
import { Observable } from 'rxjs';

//SocketIO
import {Socket} from 'ngx-socket-io'
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private fireStore: Firestore, private http: HttpClient, private socket: Socket) {}
  public idToDelete!: string;
  public idToUpdate!: string;
  public idParam!: string;
  currentFile!: any;
  isSelected!: boolean;
  spreadsheet!: Spreadsheet;
  // so:Socket = this.socket;

  db = collection(this.fireStore, 'excelFiles');
  db2 = getFirestore();


  addSheet(file:File){
    setDoc(doc(this.db, file.fileId), file);
  }

  updateFileData(id: string, data:any){
    return this.http.put(`${environment.baseUrl}file/updateData?id=${id}`, data);
  }

  getDataByFileId(fileId: string){
    console.log('join-' + fileId);
    const channel = 'message-' + fileId;
    return this.socket.fromEvent(channel);
  }

  leaveRoom(){
    // this.socket.emit('');
  }

  sendDataByFileId(fileId: string, data: any){
    this.socket.emit('message', {fileId: fileId, data: data});
    console.log(data);
  }


  openFile(sheet: Spreadsheet, file: File) {
    sheet.openFromJson({ file: file.data.jsonObject });
  }

  getAllFiles() {
    return this.http.get(`${environment.baseUrl}file/getAll`) as Observable<File[]>;
  }


  getFileById(id: string) {
    return this.http.get(`${environment.baseUrl}file/get?id=${id}`) as Observable<File>;
  }

  getFilesByOwner(ownerId: string) {
    return this.http.get(
      `${environment.baseUrl}file/getByUser?id=${ownerId}`
    ) as Observable<File[]>;
  }

  getFilesByMember(memberId: string) {
    return this.http.get(
      `${environment.baseUrl}file/getByMember?id=${memberId}`
    ) as Observable<File[]>;
  }

  deleteById(id: string){
    return this.http.delete(`${environment.baseUrl}file/delete?id=${id}`)
  }

  updateById(id: string, file: File){
    return this.http.put(`${environment.baseUrl}file/update?id=${id}`, file);
  }

  createFile(file: File) {
    return this.http.post(`${environment.baseUrl}file/create`,file);
  }



  // deleteFileById(fileId: string) {
  //   return this.http.delete(
  //     `${environment.baseUrl}file/delete?id=${fileId}`
  //   ) as Observable<File[]>;
  // }

  getFilesByDate(){
    return this.http.get(`${environment.baseUrl}file/getFilesByDate` ) as Observable<File[]>;
  }

  getFilesByTitle(){
    return this.http.get(`${environment.baseUrl}file/getFilesByTitle` ) as Observable<File[]>;
  }

  exportFile(spreadsheet: Spreadsheet, file: File, name: string){
    console.log(file);
    spreadsheet.save({
      url:'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save',
      fileName: name,
      saveType: 'Xlsx',
    })
  }
}
