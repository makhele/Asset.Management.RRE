import { IDepartment } from '../models/department.model';
import { IAllocationLetter } from '../models/allocation-letter.model';
import { DatePipe } from '@angular/common';

export class AllocationLetterPdfGenerator {
    static getpdf(allocationLetter: IAllocationLetter, logo: string, footer: string): any {
        const datepipe: DatePipe = new DatePipe('en-US');
        let breakLocation = 10;
        const arraylength = allocationLetter.allocationLetterToVehicles.length;
        if (arraylength > 10 && arraylength < 20){
          breakLocation = 10;
        }
        if (arraylength > 20 && arraylength < 30){
          breakLocation = 20;
        }
        if (arraylength > 30){
          breakLocation = 50;
        }
        const value = [];
        value.push([{ text: 'Registraion\nNumber', style: 'tableHeader' }, { text: 'Make', style: 'tableHeader' },
        { text: 'Model', style: 'tableHeader' }, { text: 'Year Model', style: 'tableHeader' }, { text: 'Colour', style: 'tableHeader' }]);
        allocationLetter.allocationLetterToVehicles.forEach((all, index) => {
            if (index === breakLocation || (index % breakLocation === 0 && index > 0)){
              value.push([{ pageBreak: 'after', text: `${all.vehicle.registration_Number}`, fontSize: 11, bold: true }, `${all.vehicle.make}`,
                `${all.vehicle.model}`, { text: `${all.vehicle.year_Model}`, noWrap: true }, {text: 'ghfghfghj'}]);
            }
            else{
              value.push([{ text: `${all.vehicle.registration_Number}`, fontSize: 11, bold: true }, `${all.vehicle.make}`,
                `${all.vehicle.model}`, { text: `${all.vehicle.year_Model}`, noWrap: true }, 'ghfghfghj']);
            }
        });
        return {
          pageMargins: [ 40, 10, 40, 70 ],
            content: [
                {
                    image: logo,
                    width: 300,
                    alignment: 'right',
                },
                {
                    text: [
                        'To: Chief Financial Officer and Transport Officer\n\n'
                    ],
                    bold: true,
                    margin: [0, 20, 0, 0]
                },
                {
                    text: [
                        `${allocationLetter.department.department_Name}\n\n`
                    ],
                    bold: true,
                },
                {
                    text: [
                        `${allocationLetter.department.physical_Address.street}\n${allocationLetter.department.physical_Address.city},\n${allocationLetter.department.physical_Address.postal_Code}\n\n`
                    ],
                },

                {
                    columns: [
                        `Date: ${datepipe.transform(allocationLetter.allocation_Date, 'd MMMM y')}`,
                        { text: `Ref: ${allocationLetter.allocation_Number}`, alignment: 'right' },
                    ]
                },
                {
                    text: [
                        'Vehicle Allocation Letter\n\n'
                    ],
                    fontSize: 14,
                    alignment: 'center',
                    bold: true,
                    decoration: 'underline',
                },
                {
                    text: [
                        'The following vehicles have been allocated. Please note the billing will start within 2 Days of this allocation date\n\n'
                    ]
                },

                {
                    style: 'tableExample',
                    table: {
                        headerRows: 1,
                        widths: [70, 'auto', 'auto', 40, 'auto'],
                        body: value
                    },
                    layout: 'headerLineOnly'
                },
                {
                    text: [
                        'Please do not hesitate to contact us at any time to discuss matters relating to Fleet Management Vehicles.'
                    ],
                    absolutePosition: {
                        x: 40,
                        y: 580
                    },
                },
                {
                    text: [
                        'Kind Regards                             ',
                    ],
                    absolutePosition: {
                        x: 40,
                        y: 620
                    },
                    decoration: 'underline',
                    lineHeight: 10
                },
              {
                image: allocationLetter.allocated_By_SignatureDataUrl,
                width: 120,
                absolutePosition: {
                  x: 40,
                  y: 635
                }
              },
                {
                    text: [
                        `Transport Manager: ${allocationLetter.allocated_By}`,
                    ],
                    absolutePosition: {
                        x: 40,
                        y: 695
                    },
                },
                {
                    text: [
                        `Date: ${datepipe.transform(allocationLetter.allocation_Date, 'd MMMM y')}`,
                    ],
                    absolutePosition: {
                        x: 40,
                        y: 710
                    },
                },

            ],
            footer: {
                image: footer,
                width: 790,
            },
            styles: {
                header: {
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'black'
                }
            },

        };
    }
}
