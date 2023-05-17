import { Initial, Stamp } from "../redux/reducers/CredentialsSlice";

export interface CredentialsType {
  data: {
    initials: Initial;
    signatures: any[];
    stamps: Stamp[];
  };
}
