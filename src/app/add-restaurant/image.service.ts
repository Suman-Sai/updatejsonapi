import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }
  insertImageDetails(imageDetails)
  {
    this.imageDetailList.push(imageDetails);
  }
}
