// import {DatePipe} from '@angular/common';
// import {IVehicleInspection} from '../models/vehicle-inspection.model';
// import {ImageDataUri} from '../utils/image-data-uri';
//
// export class VehicleInspectionPdfGenerator{
//   static getPdf(vehicleInspection: IVehicleInspection): any{
//     const datepipe: DatePipe = new DatePipe('en-US');
//     const iconMap = new Map([
//       ['ok', 'checkIconGreen'],
//       ['warning', 'warningIconOrange'],
//       ['error', 'cancelIconRed']
//     ]);
//     return {
//       pageMargins: [ 40, 10, 40, 60 ],
//       content: [
//         {
//           image: ImageDataUri.FLEET_LOGO,
//           width: 250,
//           alignment: 'right',
//         },
//         {
//           text: [
//             'Vehicle Inspection Report'
//           ],
//           margin: [0, 10, 0, 10],
//           fontSize: 16,
//           alignment: 'center',
//           bold: true,
//           decoration: 'underline',
//         },
//         {
//           text: [
//             `Ref No: ${vehicleInspection.vehicle.vehicleCheckIn.ref_No}\n\n`
//           ],
//           fontSize: 10,
//           alignment: 'right',
//           bold: true,
//         },
//         {
//           text: [
//             'Vehicle Details'
//           ],
//           margin: [0, 10, 0, 10],
//           bold: true,
//         },
//         {
//           table: {
//             widths: ['star', 'star', 'star', 'star'],
//             body: [
//               [
//                 {text: 'Registration Number', fontSize: 10, bold: true},
//                 {text: `${vehicleInspection.vehicle.registration_Number}`, fontSize: 10},
//                 {text: 'Make', fontSize: 10, bold: true},
//                 {text: `${vehicleInspection.vehicle.make}`, fontSize: 10}
//               ],
//               [
//                 {text: 'Model', fontSize: 10, bold: true},
//                 {text: `${vehicleInspection.vehicle.model}`, fontSize: 10},
//                 {text: 'Year Model', fontSize: 10, bold: true},
//                 {text: `${vehicleInspection.vehicle.year_Model}\n\n`, fontSize: 10}
//               ],
//             ]
//           } ,
//           layout: 'noBorders'
//         },
//         {
//           text: [
//             'Check in Details'
//           ],
//           bold: true,
//           margin: [0, 10, 0, 10],
//
//         },
//         {
//           table: {
//             widths: ['star', 'star', 'star', 'star'],
//             body: [
//               [
//                 {text: 'AMS Number', fontSize: 10, bold: true},
//                 {text: '5000', fontSize: 10},
//                 {text: 'Check in km', fontSize: 10, bold: true},
//                 {text: `${vehicleInspection.vehicle.vehicleCheckIn.km}`, fontSize: 10}
//               ],
//               [
//                 {text: 'Checked in by', fontSize: 10, bold: true},
//                 {text: `${vehicleInspection.vehicle.vehicleCheckIn.checked_In_By}`, fontSize: 10},
//                 {text: 'Check In date', fontSize: 10, bold: true},
//                 {text: `${datepipe.transform(vehicleInspection.vehicle.vehicleCheckIn.check_In_Date, 'd MMMM y')}`, fontSize: 10}
//               ],
//
//
//             ]
//           } ,
//           layout: 'noBorders'
//         },
//         {
//           table: {
//             widths: [15, 98, 15, 98, 15, 'star'],
//             body: [
//               [
//                 {image: `${vehicleInspection.vehicle.vehicleCheckIn.wheel_Spanner ? 'checkIconGreen' : 'cancelIconRed'}`, width: 12, },
//                 {text: 'Wheel Spanner', fontSize: 10 },
//                 {image: `${vehicleInspection.vehicle.vehicleCheckIn.jack_and_Handle ? 'checkIconGreen' : 'cancelIconRed'}`, width: 12, },
//                 {text: 'Jack and Handle', fontSize: 10 },
//                 {image: `${vehicleInspection.vehicle.vehicleCheckIn.spare_Wheel ? 'checkIconGreen' : 'cancelIconRed'}`, width: 12, },
//                 {text: 'Spare Wheel', fontSize: 10 }
//               ],
//               [
//                 {text: 'Check in reason', fontSize: 10, bold: true, colSpan: 2},
//                 {},
//                 {text: 	 `${vehicleInspection.vehicle.vehicleCheckIn.reason}\n\n`, fontSize: 10, colSpan: 4},
//                 {},
//                 {},
//                 {}
//               ],
//
//
//             ],
//           },
//           layout: 'noBorders'
//         },
//
//         {
//           text: [
//             'Inspection Details'
//           ],
//           bold: true,
//           margin: [0, 10, 0, 10],
//
//         },
//         {
//           table: {
//             headerRows: 1,
//             widths: [20, 'star', 20, 'star'],
//             body: [
//               [
//                 {text: 'Interior or Exterior', fontSize: 11, bold: true, colSpan: 2},
//                 {},
//                 {text: 'Under hood', fontSize: 11, bold: true, colSpan: 2},
//                 {}
//               ],
//               [
//                 {image: (vehicleInspection.vehicle_Body_Damage_DiagramDataUrl === '') ? ImageDataUri.VEHICLE_TOP_VIEW :
//                     vehicleInspection.vehicle_Body_Damage_DiagramDataUrl,
//                   width: 250, colSpan: 2, rowSpan: 6},
//                 {},
//                 {image: `${iconMap.get(vehicleInspection.engine_Oil)}`, width: 12, },
//                 {text: 'Engine Oil', fontSize: 10}
//               ],
//               [
//                 {},
//                 {},
//                 {image: `${iconMap.get(vehicleInspection.brakes)}`, width: 12, },
//                 {text: 'Brakes Condition', fontSize: 10}
//               ],
//               [
//                 {},
//                 {},
//                 {image: `${iconMap.get(vehicleInspection.brake_Fluid)}`, width: 12, },
//                 {text: 'Brake Fluid', fontSize: 10}
//               ],
//               [
//                 {},
//                 {},
//                 {image: `${iconMap.get(vehicleInspection.antifreeze)}`, width: 12, },
//                 {text: 'Antifreeze or Coolant', fontSize: 10}
//               ],
//               [
//                 {},
//                 {},
//                 {image: `${iconMap.get(vehicleInspection.battery_Charge)}`, width: 12, },
//                 {text: 'Battery Charge', fontSize: 10}
//               ],
//               [
//                 {},
//                 {},
//                 {image: `${iconMap.get(vehicleInspection.battery_Condition)}`, width: 12, },
//                 {text: 'Battery Condition', fontSize: 10}
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.exterior_Body)}`, width: 12, },
//                 {text: 'Exterior Body', fontSize: 10},
//                 {image: `${iconMap.get(vehicleInspection.battery_Connection)}`, width: 12, },
//                 {text: 'Battery Cables and Connections', fontSize: 10}
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.windshield)}`, width: 12, },
//                 {text: 'Windshield or Glass', fontSize: 10},
//                 {image: `${iconMap.get(vehicleInspection.wheel_Bolts)}`, width: 12, },
//                 {text: 'Wheels Bolts Tightness', fontSize: 10}
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.mirrors)}`, width: 12, },
//                 {text: 'Mirrors (Exterior and Interior)', fontSize: 10},
//                 {},
//                 {}
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.wipers)}`, width: 12, },
//                 {text: 'Wipers', fontSize: 10},
//                 {},
//                 {}
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.exterior_Lights)}`, width: 12, },
//                 {text: 'Exterior Lights (Head, Brake, Turn)', fontSize: 10},
//                 {},
//                 {}
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.interior_Lights)}`, width: 12, },
//                 {text: 'Interior Lights', fontSize: 10},
//                 {image: 'checkIconGreen', width: 12, fillColor: '#eeeeee'},
//                 {text: 'Checked and Ok', fontSize: 10, fillColor: '#eeeeee'},
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.airbag)}`, width: 12, },
//                 {text: 'Driver and Passenger Airbag check', fontSize: 10},
//                 {image: 'warningIconOrange', width: 12, fillColor: '#eeeeee'},
//                 {text: 'May require attention', fontSize: 10, fillColor: '#eeeeee'},
//               ],
//               [
//                 {image: `${iconMap.get(vehicleInspection.air_Conditioner)}`, width: 12, },
//                 {text: 'AC Operation', fontSize: 10},
//                 {image: 'cancelIconRed', width: 12, fillColor: '#eeeeee'},
//                 {text: 'Requires immediate attention', fillColor: '#eeeeee', fontSize: 10},
//               ],
//             ]
//           } ,
//           layout: 'headerLineOnly'
//         },
//         {
//           table: {
//             widths: [10, 'star', 10, 10, 'star', 10, 10, 'star', 10],
//             heights: [50],
//             body: [
//               [
//                 {text: '', border: [false, false, false, false]},
//                 {text: `${vehicleInspection.inspected_By}`, alignment: 'center', fontSize: 10,
//                   border: [false, false, false, false], margin: [0, 50, 0, 0]},
//                 {text: '', border: [false, false, false, false]},
//                 {text: '', border: [false, false, false, false]},
//                 {image: `${vehicleInspection.inspected_By_SignatureDataUrl}`, width: 120, alignment: 'center',
//                   border: [false, false, false, false], margin: [0, 0, 0, 0] },
//                 {text: '', border: [false, false, false, false]},
//                 {text: '', border: [false, false, false, false]},
//                 {text: `${datepipe.transform(vehicleInspection.inspection_Date, 'd MMMM y')}`, fontSize: 10, alignment: 'center',
//                   border: [false, false, false, false], margin: [0, 50, 0, 0]},
//                 {text: '', border: [false, false, false, false]}
//               ],
//               [
//                 {text: '', border: [false, false, false, false]},
//                 {text: 'Inspected By', fontSize: 11, bold: true, alignment: 'center', border: [false, true, false, false]},
//                 {text: '', border: [false, false, false, false]},
//                 {text: '', border: [false, false, false, false]},
//                 {text: 'Signature', fontSize: 11, bold: true, alignment: 'center', border: [false, true, false, false]},
//                 {text: '', border: [false, false, false, false]},
//                 {text: '', border: [false, false, false, false]},
//                 {text: 'Inspection Date', fontSize: 11, bold: true, alignment: 'center', border: [false, true, false, false]},
//                 {text: '', border: [false, false, false, false]}
//               ]
//
//             ]
//           } ,
//           absolutePosition: {
//             x: 40,
//             y: 680
//           },
//         },
//
//       ],
//       images: {
//         checkIconGreen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC6UExURQAAAECAQECAIECAK1CAIE2AJkqKIEmJJEiHIEeHI02GIEuFI0qFIEqEIkiEIkyDJEiFIkuFIEuFIkqEJEqEIkmEI0mEIkuGI0uGIUqGI0qFIkmFIUuFIkuFIUqFIkqEIUqEIkmGIkuGI0qFIkqFI0qFIkqFIkmFIkuFIkqFIkqEIkqEIUqGIkmGIUuFIkqFI0qFIkqFIkqFIkqFIkuFIkqFIkqFIkqEIkqFIkqFIkuFIkqFIkqFIkqFIv2l0yIAAAA9dFJOUwAECAwQFBgcICQoLDA0PEBDR0tPU1dbX2Nnb3N3e3+Dh4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/t4C1yuAAAACXBIWXMAAA7DAAAOwwHHb6hkAAADUElEQVRoQ+2ZWUPiMBSFi+jI4oIyyuKAyKKCCC6ITun9/39rOnAgaZq098Z5G77H3JNzlKbZGuzZs4dN8eSi0R2M5x8fs8d+p1GrHqDwTzhqjldkEN5fF1H+JuWbGTxNomnrGCJ/6m9wczA7h9CPc9cfrzE5gVhOZQyPbKKR3w/1YxjBIZdV7xCdBJx9ojeLRQXd2DTZf/6G8BIdeRTu0I9P9At9ORw+oZeIEfvlrryji5D5DxjkcLRABzFz1v9QmELuwQgemQwg9oLxpFuQ+hHljtZz4fg3CXPeuNIXhN4ssmeNB8iEhFq/HqysnEIkJDwL1Ku/yppbnyGSEfsHWkLGWL2ERMbaX0uInCtQ4RUSEfDXEiZoSNGAQMTOX0twrdNL1CVo/kEbbTRDg8EZyhKs/kT2gdRDVYDDn1poSyKfpV3+NEVjggqKfJz+FNl2lR0U2bj9ia7RrsPYxCXI8qd7FDSOUeKS6U9hevEUThPZ/kRV1BRNVHjk+VMNRUUXlR2TjLUt158aqCqGqGy5C346E/L9qYOyYoIKuIubXAkMf+qjrnhBZcNff1cCx58eIVAkptKNvz2B5W+ZUFFYs/W3JfD86QMSBQpr2miLMROY/rSERpE40DgTuP40h0iRXI8dCWx/GkOlMM4c1gS+Pw0gU4xQ2WJJEPhTFzpFaqpIJUj8LVNFettuJIj86QJKRR0VjUSCzJ/Su7syKjp6gsx/ZVmUbftGLUHB8LeM0iC4RS2BJYHjT02Idexng1QCy5+OoE5g35oaCTx/++a0j6pBIoHnTzeQJ6mhaqIlMP2pDH2Swm+UTXYJXP836E2c/ZHA9af6Rp/iwLm/Xiew/R3njxj3GSpOYPs7T1Ax7lNgm+9ve4u3uAaShCjztuIbd0VbhrCyUw0h8+Yz517tCjpfIm1at2OdVPnYplED3oW1A7UndFP0urHY8FSASSYl0a21zjvzjlx2L67g35CXvH6lqXUZs1P0eNID1u+/QzpaI/v9RwZXonf6y+NbUVUwLz2U0ElGjfmsn0/RQU6DcYf0Kvu4YnDQdu0EwLIhGzxpCrW+87Jw0cudO3mc3lqexqwj/rSVRbne6o6eXuNJZPkyGXabl9//TLpnz/9CEPwB7nQd48q0nCAAAAAASUVORK5CYII=',
//         warningIconOrange: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACfUExURQAAAL+AAN+fANWVAM+PANWVAM+XANWVANKTANGXANOTANGWANCVANOTANGUANCTANOWANKUANGTANOVANKVANGWANOVANKVANKWANOVANKWANGVANOVANKWANKVANGVANKWANGVANOWANKVANOWANKVANKVANKVANOVANKVANGVANKVANKVANKVANKVANOVANKVANKVANKVANKVANKVAHEpCJkAAAA0dFJOUwAECAwQGCAkKCw0ODxAQ0dLT1NXW19jZ2tzd3t/g4eLj5ebo6evt7vDx8/T2+Pn6+/z9/suuAmNAAAACXBIWXMAAA7DAAAOwwHHb6hkAAACUUlEQVRoQ+2YyXbbMBAEZdnOvjv7vttJlMSx8P/fFomsKCTQAAhgeGOdCDTe9EV+9carhYWFYh7e4mMm1psLvmbilXOP+ZyF0z/O/VxzmINPbscbDjNwez/fXV3jaM+3rsB95mjOk36+c3e5MOb4F/Pd9yOubHnL+B3PuDLl+hXTd/w+4dKSLwzveM+lIfcY3bO9wbUZRz8YDV+5N+M5gw88IDDi5JK5Bza2P9UPjB3wksiEm1umDrg8JbTgnKEjPhIa8IiRHmb2XG+Y6GFmz50nNUb23HtSY2TPzpMaE3v2ntSY2BNPagzsefCkptme/z2pabbnwJOaRnsOPalptOfIk5ome449qWmxp+9JrlccocGevie59grq7Rl4knu/oNqegSe59wtq7Rl6kiAoqLRn6EmCoKDOnsKTJGHBtsKeypNEYUGNPZUniUSBOyOajPQkmSootqf0JJkqcK/JJqI9SSgLCu2pPUkoC8rsGfEkqS5wd0gnEPMkcaSgwJ4xTxJHCtxT4ix5T2om23OCJzXvGJBhiic10+zpe7KESfYM9skS7jMkQbhPljDBnmKfLOEFY6KofbKErD3lPvkP3sT+0Doy9ozsk8CjZEHanrF9EniVLEjbM7pP9vAqXZCyZ3yf7OFZpiBhz8Q+2cGzTEHcnql9soN3uYKoPZP75B7e5Qpi9szskyVIe+b2yRKkPbP7ZAnCnrWe1Ah7VntSE9iz3pMa354tntR49mzypGZkzzZPakb2bPSkZmDPVk9qBvZMerIew//cLiwsLLSwWv0FjzN/qsxZBuwAAAAASUVORK5CYII=',
//         cancelIconRed: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC9UExURQAAAL9AAL9gAL9VAL9QEL9NDb9VC79SCb9QCL9OB79TBr9RBr9QC79TCr9SCb9RCb9QCL5QCL5TB75SB75RBr5QCb9RCL9RCL9QCL9SB79RB79QB79SCb9RCb9RCL9QCL9SCL9RCL9RB79QB79SCb9RCL1RCL1SCL1RCL1RB71SB71RCb5RCL5QCL5RCL5RCL5RCL5QCL5RB75RCL5RCL5SCL5RCL5RCL5RCL5RCL5RB75RCL5RCL5RCL5RCCXGjC0AAAA+dFJOUwAECAwQFBgcICQoLDA0ODxAQ0dLT1NbX2Nna29zd3t/g4eLj5OXm5+nq6+zt7u/w8fLz9PX29/j5+vv8/f7oOdOEQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAA4pJREFUaEPtmVtD4jAUhFu6oigKqFDwAq6KKKiAqxUt9P//rK0wkLTn5Fb2bfkemZMZStLc8Hbs2GFNUD0Ne/3hJIrGT/fdsHFUgvBPKLdH8yRH/Nj6BXlLKtdjeOZZvFzso6g4zfeVmYppHYXFqE/ho+GlimJ3qiN4GBhU0MCN/cECBkbmdwX6u/6F1lZER2hmTcf666+Iz9HQDr+Pdg500daGvVc0cuIxQHMjhx9o4si0DAMD5QgNnJlaPYOvmhkseISHlgcUF8Kipy9RWhDjaG04jv88seGNO/hGYWEi/awxRNkW3MGKpYaibZjr5lbmDY51S844ZLpsADOGc5RIxDWvrEwYB16TSVCuQD51Sv3TV1uRkPp7XMLL0o0hRIFg6a9KWPp7XIJinfZn0DfAn0+Av8ckTKHkoENIfBOasPHnnpzfzdxCFTz5kGiC5B/Q2fECUhZmFVAm6P35bj6CmEGRYPBPFtx80YWYhU0w+SdJC7LMBFoOJsHsz608+5AIJMHCP4np7v4MEiWXYOOfJHRZaENhyCTY+ScN1Ah6UDjkBDv/JESRQLvWSwkbtP7M6q/fqtMEvX9yjzKB4aiRTzD4J0+oE3xCUZFNMPknYxQKIKiRE4z+SYRKAQQ10viUZg0Vn6gUkNUmh+xvkTBBoeANioKsvzlhiDrBMxSevL8xoY8ywQAKC/U3JfRQJdBNFZJ/IMaSNoFOFR0oDLL/WBqtuoRT1AiYXR3I+GfeB00C3d1VoBBy/nYJc6bT/kDLQfytEkbQZW6gZWH8bRLakGVOoGVg/S0S2BMzM58q/I0JdC79gd5PKP1NCdeQsjSgCo6hUP9MQnP1iQR/iiqRE+bsEBL1lxJqMT7Z8A4lzxV0ARI4/00C9U+aS4FSot28TOD9kcD4K84fKfQk8ZOg8l8mMP6qE1SKz6w6s2Olf5pQZ/y5t3iNeoNqz0J7j1roLi2L5hyeUiWX4K58Ga6zW6grysJ4l/0blQXpwEaNb3lhzUM3E5RAsYbY8ComKA0Vp1trmY89WBioFUyI1nOjkUqhX2lsefH7Q1Cgpx+sfv81vutoXVyipTUtp3f6mx5bjVQd5qXhARq5cWY4M6x5XV+MOeOHpqNhyrvbnys5SleGu+ZZ6DR4GEqNvvIxPm5r29qvOLlhdsaTrvNfWzoq553e4PktPYt+TkcPvfbZ9n+T7tjxv+B5fwEe5Az+kdtqsAAAAABJRU5ErkJggg=='
//
//
//       },
//       footer: {
//         image: ImageDataUri.FLEET_FOOTER,
//         width: 750,
//       },
//   };
//
//
// }
// }
