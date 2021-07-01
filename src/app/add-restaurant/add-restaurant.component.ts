import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '../common.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ImageService } from './image.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss']
})
export class AddRestaurantComponent implements OnInit {
  imgSrc : string;filePath:string;
  selectedImage:any;
  alert:boolean = false;
  addRestaurent= new FormGroup({
    name: new FormControl(''),
    Adress: new FormControl(''),
    email: new FormControl(''), imageUrl : new FormControl('')
  })
  constructor(private resto:CommonService,private storage:AngularFireStorage,private service:ImageService) { }

  ngOnInit(): void {
  }
  craeteResto(){
    // console.log(this.addRestaurent.value);
    var filePath = `${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            this.addRestaurent['imageUrl']=url;
            this.service.insertImageDetails(this.addRestaurent);
            console.log(url);
          })
        })
      ).subscribe();
    this.resto.addResto(this.addRestaurent.value).subscribe((result)=>{
      this.alert = true;
      this.addRestaurent.reset({});
      console.log("Get Data From Service", result)
    })
    
  }
  closeAlert(){
    this.alert = false;
  }
  showPreview(event:any)
  {
    if(event.target.files && event.target.files[0])
    {
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/img/arrow.gif';
      this.selectedImage = null;
    }

  }
}
