import {IVehicleInspection} from '../models/vehicle-inspection.model';
import {DatePipe} from '@angular/common';
import {ImageDataUri} from '../utils/image-data-uri';
import { IVehicle } from '../models/vehicle.model';

export class AssetVerificationPdfGenerator{
  static getPdf(vehicle: IVehicle, imageUrls: any[]): any{
    const datepipe: DatePipe = new DatePipe('en-US');
    console.log('Inside get Vehicles', imageUrls);
    const imageWidth = 250;
    const imageHeight = 185;
    const photos = [];
    const objectArray = [];
    switch (imageUrls.length) {
      case 1:
        photos.push([{ image: `${imageUrls[0]}`, alignment: 'center', fit: [imageWidth, imageHeight]}, {}]);
        break;
      case 2:
        photos.push([
          { image: `${imageUrls[0]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[1]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        break;
      case 3:
        photos.push([
          { image: `${imageUrls[0]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[1]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        photos.push([{ image: `${imageUrls[2]}`, alignment: 'center', fit: [imageWidth, imageHeight]}, {}]);
        break;
      case 4:
        photos.push([
          { image: `${imageUrls[0]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[1]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        photos.push([
          { image: `${imageUrls[2]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[3]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        break;
      case 5:
        photos.push([
          { image: `${imageUrls[0]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[1]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        photos.push([
          { image: `${imageUrls[2]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[3]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        photos.push([
          { image: `${imageUrls[4]}`, alignment: 'center', fit: [imageWidth, imageHeight]},
          { image: `${imageUrls[3]}`, alignment: 'center', fit: [imageWidth, imageHeight]}]);
        break;

    }

    return {
      pageMargins: [ 40, 10, 40, 60 ],
      content: [
        {
          image: ImageDataUri.FLEET_LOGO,
          width: 250,
          alignment: 'right',
        },
        {
          text: [
            'Road Building Equipment (RBE) 2021/2022 Asset Verification'
          ],
          margin: [0, 30, 0, 30],
          fontSize: 16,
          alignment: 'center',
          bold: true,
          decoration: 'underline',
        },
        {
          text: [
            'Vehicle Details'
          ],
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          table: {
            widths: ['star', 'star', 'star', 'star'],
            body: [
              [
                {text: 'Fleet Number', fontSize: 10, bold: true},
                {text: `${vehicle.fleetNumber}`, fontSize: 10},
                {text: 'Registration Number', fontSize: 10, bold: true},
                {text: `${vehicle.registrationNumber}`, fontSize: 10},
              ],
              [
                {text: 'Make', fontSize: 10, bold: true},
                {text: `${vehicle.model}`, fontSize: 10},
                {text: 'Model', fontSize: 10, bold: true},
                {text: `${vehicle.model}`, fontSize: 10}
              ],
              [
                {text: 'Engine Number', fontSize: 10, bold: true},
                {text: `${vehicle.engineNumber}`, fontSize: 10},
                {text: 'Chassis Number', fontSize: 10, bold: true},
                {text: `${vehicle.chassisNumber}`, fontSize: 10}
              ],
              [
                {text: 'KM or Hour Reading', fontSize: 10, bold: true},
                {text: `${vehicle.kmOrHourReading}\n\n`, fontSize: 10},
                {},
                {}
              ],
            ]
          } ,
          layout: 'noBorders'
        },
        {
          text: [
            'Verification Details'
          ],
          bold: true,
          margin: [0, 10, 0, 10],

        },
        {
          table: {
            widths: ['star', 'star', 'star', 'star'],
            body: [
              [
                {text: 'Region', fontSize: 10, bold: true},
                {text: vehicle.region, fontSize: 10},
                {text: 'District', fontSize: 10, bold: true},
                {text: vehicle.district, fontSize: 10}
              ],
              [
                {text: 'Client', fontSize: 10, bold: true},
                {text: `${vehicle.client}`, fontSize: 10},
                {text: 'Condition', fontSize: 10, bold: true},
                {text:  vehicle.condition, fontSize: 10}
              ],


            ]
          } ,
          layout: 'noBorders'
        },
        {
          table: {
            widths: [10, 'star', 10, 10, 'star', 10, 10, 'star', 10],
            heights: [50],
            body: [
              [
                {text: '', border: [false, false, false, false]},
                {text: `${vehicle.verifiedByFirstName} ${vehicle.verifiedBySurname}`, alignment: 'center', fontSize: 10,
                  border: [false, false, false, false], margin: [0, 50, 0, 0]},
                {text: '', border: [false, false, false, false]},
                {text: '', border: [false, false, false, false]},
                {text: '', width: 120, alignment: 'center',
                  border: [false, false, false, false], margin: [0, 0, 0, 0] },
                {text: '', border: [false, false, false, false]},
                {text: '', border: [false, false, false, false]},
                {text: `${datepipe.transform(vehicle.dateVerified.seconds, 'd MMMM y')}`, fontSize: 10, alignment: 'center',
                  border: [false, false, false, false], margin: [0, 50, 0, 0]},
                {text: '', border: [false, false, false, false]}
              ],
              [
                {text: '', border: [false, false, false, false]},
                {text: 'Verified By', fontSize: 11, bold: true, alignment: 'center', border: [false, true, false, false]},
                {text: '', border: [false, false, false, false]},
                {text: '', border: [false, false, false, false]},
                {text: 'Signature', fontSize: 11, bold: true, alignment: 'center', border: [false, true, false, false]},
                {text: '', border: [false, false, false, false]},
                {text: '', border: [false, false, false, false]},
                {text: 'Verification Date', fontSize: 11, bold: true, alignment: 'center', border: [false, true, false, false]},
                {text: '', border: [false, false, false, false]}
              ]

            ]
          } ,
          absolutePosition: {
            x: 40,
            y: 680,
          },
        },
        {pageBreak: 'before',
          image: ImageDataUri.FLEET_LOGO,
          width: 250,
          alignment: 'right',
        },
        {
          text: [
            'Road Building Equipment (RBE) 2021/2022 Asset Verification'
          ],
          margin: [0, 30, 0, 30],
          fontSize: 16,
          alignment: 'center',
          bold: true,
          decoration: 'underline',
        },
        {
          text: [
            'Uploaded Photos'
          ],
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          table: {
            widths: [imageWidth, imageWidth],
            heights: [imageHeight, imageHeight, imageHeight],
            body: photos
          } ,
          layout: 'noBorders'
        },
      ],
      images: {
        checkIconGreen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC6UExURQAAAECAQECAIECAK1CAIE2AJkqKIEmJJEiHIEeHI02GIEuFI0qFIEqEIkiEIkyDJEiFIkuFIEuFIkqEJEqEIkmEI0mEIkuGI0uGIUqGI0qFIkmFIUuFIkuFIUqFIkqEIUqEIkmGIkuGI0qFIkqFI0qFIkqFIkmFIkuFIkqFIkqEIkqEIUqGIkmGIUuFIkqFI0qFIkqFIkqFIkqFIkuFIkqFIkqFIkqEIkqFIkqFIkuFIkqFIkqFIkqFIv2l0yIAAAA9dFJOUwAECAwQFBgcICQoLDA0PEBDR0tPU1dbX2Nnb3N3e3+Dh4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/t4C1yuAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADUElEQVRoQ+2ZWUPiMBSFi+jI4oIyyuKAyKKCCC6ITun9/39rOnAgaZq098Z5G77H3JNzlKbZGuzZs4dN8eSi0R2M5x8fs8d+p1GrHqDwTzhqjldkEN5fF1H+JuWbGTxNomnrGCJ/6m9wczA7h9CPc9cfrzE5gVhOZQyPbKKR3w/1YxjBIZdV7xCdBJx9ojeLRQXd2DTZf/6G8BIdeRTu0I9P9At9ORw+oZeIEfvlrryji5D5DxjkcLRABzFz1v9QmELuwQgemQwg9oLxpFuQ+hHljtZz4fg3CXPeuNIXhN4ssmeNB8iEhFq/HqysnEIkJDwL1Ku/yppbnyGSEfsHWkLGWL2ERMbaX0uInCtQ4RUSEfDXEiZoSNGAQMTOX0twrdNL1CVo/kEbbTRDg8EZyhKs/kT2gdRDVYDDn1poSyKfpV3+NEVjggqKfJz+FNl2lR0U2bj9ia7RrsPYxCXI8qd7FDSOUeKS6U9hevEUThPZ/kRV1BRNVHjk+VMNRUUXlR2TjLUt158aqCqGqGy5C346E/L9qYOyYoIKuIubXAkMf+qjrnhBZcNff1cCx58eIVAkptKNvz2B5W+ZUFFYs/W3JfD86QMSBQpr2miLMROY/rSERpE40DgTuP40h0iRXI8dCWx/GkOlMM4c1gS+Pw0gU4xQ2WJJEPhTFzpFaqpIJUj8LVNFettuJIj86QJKRR0VjUSCzJ/Su7syKjp6gsx/ZVmUbftGLUHB8LeM0iC4RS2BJYHjT02Idexng1QCy5+OoE5g35oaCTx/++a0j6pBIoHnTzeQJ6mhaqIlMP2pDH2Swm+UTXYJXP836E2c/ZHA9af6Rp/iwLm/Xiew/R3njxj3GSpOYPs7T1Ax7lNgm+9ve4u3uAaShCjztuIbd0VbhrCyUw0h8+Yz517tCjpfIm1at2OdVPnYplED3oW1A7UndFP0urHY8FSASSYl0a21zjvzjlx2L67g35CXvH6lqXUZs1P0eNID1u+/QzpaI/v9RwZXonf6y+NbUVUwLz2U0ElGjfmsn0/RQU6DcYf0Kvu4YnDQdu0EwLIhGzxpCrW+87Jw0cudO3mc3lqexqwj/rSVRbne6o6eXuNJZPkyGXabl9//TLpnz/9CEPwB7nQd48q0nCAAAAAASUVORK5CYII=',
        warningIconOrange: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACfUExURQAAAL+AAN+fANWVAM+PANWVAM+XANWVANKTANGXANOTANGWANCVANOTANGUANCTANOWANKUANGTANOVANKVANGWANOVANKVANKWANOVANKWANGVANOVANKWANKVANGVANKWANGVANOWANKVANOWANKVANKVANKVANOVANKVANGVANKVANKVANKVANKVANOVANKVANKVANKVANKVANKVAHEpCJkAAAA0dFJOUwAECAwQGCAkKCw0ODxAQ0dLT1NXW19jZ2tzd3t/g4eLj5ebo6evt7vDx8/T2+Pn6+/z9/suuAmNAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACUUlEQVRoQ+2YyXbbMBAEZdnOvjv7vttJlMSx8P/fFomsKCTQAAhgeGOdCDTe9EV+9carhYWFYh7e4mMm1psLvmbilXOP+ZyF0z/O/VxzmINPbscbDjNwez/fXV3jaM+3rsB95mjOk36+c3e5MOb4F/Pd9yOubHnL+B3PuDLl+hXTd/w+4dKSLwzveM+lIfcY3bO9wbUZRz8YDV+5N+M5gw88IDDi5JK5Bza2P9UPjB3wksiEm1umDrg8JbTgnKEjPhIa8IiRHmb2XG+Y6GFmz50nNUb23HtSY2TPzpMaE3v2ntSY2BNPagzsefCkptme/z2pabbnwJOaRnsOPalptOfIk5ome449qWmxp+9JrlccocGevie59grq7Rl4knu/oNqegSe59wtq7Rl6kiAoqLRn6EmCoKDOnsKTJGHBtsKeypNEYUGNPZUniUSBOyOajPQkmSootqf0JJkqcK/JJqI9SSgLCu2pPUkoC8rsGfEkqS5wd0gnEPMkcaSgwJ4xTxJHCtxT4ix5T2om23OCJzXvGJBhiic10+zpe7KESfYM9skS7jMkQbhPljDBnmKfLOEFY6KofbKErD3lPvkP3sT+0Doy9ozsk8CjZEHanrF9EniVLEjbM7pP9vAqXZCyZ3yf7OFZpiBhz8Q+2cGzTEHcnql9soN3uYKoPZP75B7e5Qpi9szskyVIe+b2yRKkPbP7ZAnCnrWe1Ah7VntSE9iz3pMa354tntR49mzypGZkzzZPakb2bPSkZmDPVk9qBvZMerIew//cLiwsLLSwWv0FjzN/qsxZBuwAAAAASUVORK5CYII=',
        cancelIconRed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC9UExURQAAAL9AAL9gAL9VAL9QEL9NDb9VC79SCb9QCL9OB79TBr9RBr9QC79TCr9SCb9RCb9QCL5QCL5TB75SB75RBr5QCb9RCL9RCL9QCL9SB79RB79QB79SCb9RCb9RCL9QCL9SCL9RCL9RB79QB79SCb9RCL1RCL1SCL1RCL1RB71SB71RCb5RCL5QCL5RCL5RCL5RCL5QCL5RB75RCL5RCL5SCL5RCL5RCL5RCL5RCL5RB75RCL5RCL5RCL5RCCXGjC0AAAA+dFJOUwAECAwQFBgcICQoLDA0ODxAQ0dLT1NbX2Nna29zd3t/g4eLj5OXm5+nq6+zt7u/w8fLz9PX29/j5+vv8/f7oOdOEQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAA4pJREFUaEPtmVtD4jAUhFu6oigKqFDwAq6KKKiAqxUt9P//rK0wkLTn5Fb2bfkemZMZStLc8Hbs2GFNUD0Ne/3hJIrGT/fdsHFUgvBPKLdH8yRH/Nj6BXlLKtdjeOZZvFzso6g4zfeVmYppHYXFqE/ho+GlimJ3qiN4GBhU0MCN/cECBkbmdwX6u/6F1lZER2hmTcf666+Iz9HQDr+Pdg500daGvVc0cuIxQHMjhx9o4si0DAMD5QgNnJlaPYOvmhkseISHlgcUF8Kipy9RWhDjaG04jv88seGNO/hGYWEi/awxRNkW3MGKpYaibZjr5lbmDY51S844ZLpsADOGc5RIxDWvrEwYB16TSVCuQD51Sv3TV1uRkPp7XMLL0o0hRIFg6a9KWPp7XIJinfZn0DfAn0+Av8ckTKHkoENIfBOasPHnnpzfzdxCFTz5kGiC5B/Q2fECUhZmFVAm6P35bj6CmEGRYPBPFtx80YWYhU0w+SdJC7LMBFoOJsHsz608+5AIJMHCP4np7v4MEiWXYOOfJHRZaENhyCTY+ScN1Ah6UDjkBDv/JESRQLvWSwkbtP7M6q/fqtMEvX9yjzKB4aiRTzD4J0+oE3xCUZFNMPknYxQKIKiRE4z+SYRKAQQ10viUZg0Vn6gUkNUmh+xvkTBBoeANioKsvzlhiDrBMxSevL8xoY8ywQAKC/U3JfRQJdBNFZJ/IMaSNoFOFR0oDLL/WBqtuoRT1AiYXR3I+GfeB00C3d1VoBBy/nYJc6bT/kDLQfytEkbQZW6gZWH8bRLakGVOoGVg/S0S2BMzM58q/I0JdC79gd5PKP1NCdeQsjSgCo6hUP9MQnP1iQR/iiqRE+bsEBL1lxJqMT7Z8A4lzxV0ARI4/00C9U+aS4FSot28TOD9kcD4K84fKfQk8ZOg8l8mMP6qE1SKz6w6s2Olf5pQZ/y5t3iNeoNqz0J7j1roLi2L5hyeUiWX4K58Ga6zW6grysJ4l/0blQXpwEaNb3lhzUM3E5RAsYbY8ComKA0Vp1trmY89WBioFUyI1nOjkUqhX2lsefH7Q1Cgpx+sfv81vutoXVyipTUtp3f6mx5bjVQd5qXhARq5cWY4M6x5XV+MOeOHpqNhyrvbnys5SleGu+ZZ6DR4GEqNvvIxPm5r29qvOLlhdsaTrvNfWzoq553e4PktPYt+TkcPvfbZ9n+T7tjxv+B5fwEe5Az+kdtqsAAAAABJRU5ErkJggg=='


      },
      footer: {
        image: ImageDataUri.FLEET_FOOTER,
        width: 750,
      },
    };


  }
}
