import { Component, ElementRef, EventEmitter, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'upload-images',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './upload-images.component.html'
})
export class UploadImagesComponent implements OnInit{
  ngOnInit(): void {
    this.previewImage.set(this.defaultImage);
  }

  public previewImage = signal<string>("");

  @ViewChild('uploadFile')
  private inputFile!:ElementRef<HTMLInputElement>;

  @Output()
  public onChangeFileValue = new EventEmitter<string>();

  @Output()
  public onChangeFileFile = new EventEmitter<File>();

  @Input({required: false})
  public defaultImage:string = "https://imgs.search.brave.com/adgcWwVDWZgwzQvV2KLx-nbjGN3Wb7qEon9EhK1MC1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZHVwbGljaGVja2Vy/LmNvbS9hc2V0cy9p/bWFnZXMvcmlzX3Vw/bG9hZC5zdmc";



  public onClick(){
    this.inputFile.nativeElement.click();
  }

  protected onChangeFile(e:Event){
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if(!files || files.length <= 0){
      return;
    }
    const file = files[0];
    this.onDecodeFile(file);
  }


  private events(url: string, file?:File){
    this.previewImage.set(url);
    this.onChangeFileValue.emit(url);
    this.onChangeFileFile.emit(file);
  }

  protected onDecodeFile( file:File ){
    const reader = new FileReader();
    reader.onload = () => {
      const value = reader.result as string;
      this.events(value, file);
    };
  
    reader.readAsDataURL(file);
  }

  protected onDeleteImage(){
    this.previewImage.set(this.defaultImage);
    this.events(this.defaultImage, undefined);

    if(this.inputFile){
      this.inputFile.nativeElement.value = '';
    }
  }
}
