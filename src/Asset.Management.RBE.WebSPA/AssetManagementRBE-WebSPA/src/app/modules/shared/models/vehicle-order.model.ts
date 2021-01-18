export interface IVehicleOrder{
  id: number;
  vehicleRequestLetterId: number;
  order_Number: string;
  order_Date: Date;
  order_Unit_Price: number;
  order_Quantity: number;
  total_Order_Price: number;
  order_Documents: string;
}
