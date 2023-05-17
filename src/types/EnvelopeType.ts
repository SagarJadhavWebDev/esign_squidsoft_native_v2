import { ViewEnvelopeTypes } from "./ViewEnvelopeTypes";

export interface EnvelopeType {
  data: {
    id: number;
    created_at: Date;
    updated_at: Date;
    delete_token:string;
    deleted_at: null;
    self_sign: boolean;
    subject: null;
    message: null;
    sent_at: null;
    expire_at: null;
  };
  viewEnvelope: ViewEnvelopeTypes;
}
