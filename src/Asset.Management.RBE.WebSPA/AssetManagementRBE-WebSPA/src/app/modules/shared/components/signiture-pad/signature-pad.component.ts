import { Component, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss']
})
export class SignaturePadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SignaturePadComponent>, ) { }
  signaturePad: SignaturePad;
  canvas: any;
  ngA;

  ngOnInit(): void {
    this.resizeCanvas();
    this.canvas = document.querySelector('canvas');
    this.signaturePad = new SignaturePad(this.canvas);
    window.onresize = this.resizeCanvas;
  }

  onSave(): void{
    if (this.signaturePad.isEmpty()){
      return alert('Please provide a signature first.');
    }
    this.signaturePad.toDataURL(); // save image as PNG
    window.onresize = null;
    this.dialogRef.close(this.signaturePad.toDataURL());
  }
  clear() {
    this.signaturePad.clear();
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

  /**
   * Crop signature canvas to only contain the signature and no whitespace.
   *
   * @since 1.0.0
   */
  cropSignatureCanvas(canvas): string {

    // First duplicate the canvas to not alter the original
    let croppedCanvas: HTMLCanvasElement;
    let croppedCtx: CanvasRenderingContext2D;
    croppedCanvas = document.createElement('canvas');
    croppedCtx = croppedCanvas.getContext('2d');

    croppedCanvas.width  = canvas.width;
    croppedCanvas.height = canvas.height;
    croppedCtx.drawImage(canvas, 0, 0);

    // Next do the actual cropping
    let w: number;
    let h: number;
    let pix: { x: any[]; y: any[] };
    let imageData: ImageData;
    let x;
    let y;
    let index;
    w = croppedCanvas.width;
    h = croppedCanvas.height;
    pix = {x: [], y: []};
    imageData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height);

    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        index = (y * w + x) * 4;
        if (imageData.data[index + 3] > 0) {
          pix.x.push(x);
          pix.y.push(y);

        }
      }
    }
    pix.x.sort((a, b) => a - b);
    pix.y.sort((a, b ) => a - b);
    const n = pix.x.length - 1;

    w = pix.x[n] - pix.x[0];
    h = pix.y[n] - pix.y[0];
    const cut = croppedCtx.getImageData(pix.x[0], pix.y[0], w, h);

    croppedCanvas.width = w;
    croppedCanvas.height = h;
    croppedCtx.putImageData(cut, 0, 0);

    return croppedCanvas.toDataURL();
  }


}


