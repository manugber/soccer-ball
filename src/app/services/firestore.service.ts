import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SoccerBallDto } from "../dto/soccer-ball.dto";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {

  private path = '/soccer-ball';
  brands = ['Nike', 'Adidas', 'Puma'];
  materials = ['Polyester', 'Synthetic leather', 'Polyurethane'];
  soccerBalls: SoccerBallDto[] = [];

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getAll() {
    return this.firestore.collection(this.path).snapshotChanges().subscribe(balls => {
      balls.forEach((ball: any) => {
        this.soccerBalls.push({
          id: ball.payload.doc.id,
          ...ball.payload.doc.data()
        });
      });
    });
  }

  create(fileUpload: FileUpload, soccerBall: any) {
    const filePath = `${this.path}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.firestore.collection(this.path).add({...soccerBall, imageUrl: downloadURL});
        });
      })
    ).subscribe()
  }

  updateWithFile(id: string, fileUpload: FileUpload, soccerBall: any) {
    const filePath = `${this.path}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.firestore.collection(this.path).doc(id).update({...soccerBall, imageUrl: downloadURL});
        });
      })
    ).subscribe()
  }

  update(id: string, soccerBall: any) {
    this.firestore.collection(this.path).doc(id).update(soccerBall);
  }

  delete(id: string) {
    return this.firestore.collection(this.path).doc(id).delete();
  }
}

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
