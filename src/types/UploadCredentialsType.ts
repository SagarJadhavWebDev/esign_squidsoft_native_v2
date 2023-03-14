export type UploadCredentialsType = "Signature" | "Stamp" | "Initial";
export interface UploadCredentialsFileType {
  name: string;
  filename: string;
  type: string;
  uri: string;
}
