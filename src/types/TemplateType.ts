export interface TemplateType {
    category:    TemplateCategoryType;
    created_at:  string | null;
    deleted_at:  string | null;
    description: string | null;
    documents:   TemplateDocuments[];
    id:          number;
    name:        string;
    tenant:      any;
    updated_at:  string | null;
    user:        any;
}

export interface TemplateCategoryType {
    created_at: string | null;
    deleted_at: string | null;
    id:         number;
    name:       string;
    parent_id?: any;
    type:       string;
    updated_at: string | null;
    parent?:    any;
}

export interface TemplateDocuments {
    created_at:  string|null;
    deleted_at:  string | null;
    id:          number;
    meta_data:   any | null;
    name:        string;
    path:        string;
    template_id: number;
    updated_at:  string | null;
}