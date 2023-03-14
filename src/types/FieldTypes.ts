export interface FieldPayload {
  id: string;
  envelopeid: number;
  documentid: number;
  pageno: number;
  type: FILLEDDATATYPE;
  userid: number;
  email: string;
  data?: null;
  name: string;
  xCord: number;
  yCord: number;
  width: number;
  height: number;
  actualpageheight: number;
  actualpagewidth: number;
  xdifpercentage: number;
  ydifpercentage: number;
  dispalypagewidth: number;
  displaypageheight: number;
  rgbaColor: string;
  uniqueID: string;
  iconName: string;
}
export interface PageFieldType {
  document_page_id: number;
  envelope_recipient_id: number;
  filled_at: null | string;
  id: number | string;
  image_url: string | null;
  meta_data: any | null;
  response_payload: FieldPayload;
  type: FILLEDDATATYPE | string;
  user_digital_credentials_id: string | null;
  x_axis_percentage: string;
  y_axis_percentage: string;
}
export type FILLEDDATATYPE =
  | "text"
  | "date"
  | "time"
  | "signature"
  | "stamp"
  | "initial";
