import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import SignaturePad from 'signature_pad';
import {HttpClient} from '@angular/common/http';
import {ImageDataUri} from '../../utils/image-data-uri';

@Component({
  selector: 'app-vehicle-body-damage-diagram',
  templateUrl: './vehicle-body-damage-diagram.component.html',
  styleUrls: ['./vehicle-body-damage-diagram.component.scss']
})
export class VehicleBodyDamageDiagramComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<VehicleBodyDamageDiagramComponent>) { }
  signaturePad: SignaturePad;
  canvas: any;
  backgroundImageDataUri =  ImageDataUri.VEHICLE_TOP_VIEW;
  backgroundAndSignatureDataURI: string;
  inMemoryCanvas: any;
  ctx: any;

  ngOnInit(): void {
    this.canvas = document.getElementById('signature-pad');
    this.signaturePad = new SignaturePad(this.canvas);
    this.resizeCanvas();
    window.onresize = this.resizeCanvas;
  }

  onSave(): void{
    if (this.signaturePad.isEmpty()){
      return alert('Please provide a signature first.');
    }
    this.signaturePad.toDataURL(); // save image as PNG
    window.onresize = null;

    const canvas = document.getElementById('signature-pad') ;
    const canvasWidth = 1148;
    const canvasHeight = 574;
    const backgroundImage = document.getElementById('backgroundImage') ;
    const backgroundImageWidth = 1112 ;
    const backgroundImageHeight = 556;

    this.inMemoryCanvas = document.createElement('canvas');
    this.inMemoryCanvas.width = canvasWidth;
    this.inMemoryCanvas.height = canvasHeight;
    this.ctx = this.inMemoryCanvas.getContext('2d');

    this.paintBackgroundImageToInMemoryCanvas(backgroundImageWidth, backgroundImageHeight).then(() => {
      this.paintSignatureDataURLToInMemoryCanvas(canvasWidth, canvasHeight).then(() => {
        this.dialogRef.close(this.backgroundAndSignatureDataURI);
      });
    });

    // this.dialogRef.close(this.signaturePad.toDataURL());
  }
  clear(): void {
    this.signaturePad.clear();
  }

  undo(): void {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  // Adjust canvas coordinate space taking into account pixel ratio,
  // to make it look crisp on mobile devices.
  // This also causes canvas to be cleared
  resizeCanvas(): void {
    this.canvas = document.querySelector('canvas');
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio =  Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d').scale(ratio, ratio);
  }

  paintBackgroundImageToInMemoryCanvas(width: number, height: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const backgroundImage = new Image();
      backgroundImage.onload = () => {
        this.ctx.drawImage(backgroundImage, 0, 0, width, width / 2); // Or at whatever offset you like
        resolve();
      };
      backgroundImage.src = this.backgroundImageDataUri;
    });
  }

  paintSignatureDataURLToInMemoryCanvas(width: number, height: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const signatureImage = new Image();
      signatureImage.onload = () => {
        this.ctx.drawImage(signatureImage, 0, 0, width, height); // Or at whatever offset you like
        this.backgroundAndSignatureDataURI = this.inMemoryCanvas.toDataURL();
        resolve();
      };
      signatureImage.src = this.signaturePad.toDataURL();
    });
  }
}
