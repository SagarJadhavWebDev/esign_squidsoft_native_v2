// To parse this data:
//
//   import { Convert, Envelope } from "./file";
//
//   const envelope = Convert.toEnvelope(json);

export interface EnvelopeType {
    auth:         number;
    authFields:   any[];
    body:         string;
    completed:    boolean;
    created_date: string;
    created_time: string;
    documents:    EnvelopeDocument[];
    expire_at:    string;
    expire_time:  string;
    fields:       any[];
    id:           number;
    recipients:   EnvelopeRecipient[];
    self_sign:    number;
    sent_at:      string;
    sent_date:    string;
    sent_time:    string;
    subject:      string;
    user:         EnvelopeUser;
}

export interface EnvelopeDocument {
    id:    number;
    name:  string;
    pages: string[];
    path:  null;
}

export interface EnvelopeRecipient {
    id:        number;
    level:     number;
    operation: string;
    signed_at: null;
    user:      string[];
}

export interface EnvelopeUser {
    created_at: string;
    email:      string;
    id:         number;
    name:       string;
    updated_at: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toEnvelope(json: string): EnvelopeType {
        return JSON.parse(json);
    }

    public static envelopeToJson(value: EnvelopeType): string {
        return JSON.stringify(value);
    }
}
