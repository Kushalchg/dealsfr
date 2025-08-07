export interface SetStoreData {
    name: string; 
    logo?: string | File | null;
    store_type: "DEPT" | "SUPER" | "LOCAL" | "ONLINE"; 
    city: string; 
    district: string; 
    location_link?: string | null; 
    address: string; 
    phone: string; 
    email: string; 
    social_media_links?: Record<string, unknown> | null; 
    latitude?: string | null;   
    longitude?: string | null; 
    is_verified?: boolean; 
    business_registration_number?: string; 
    documents?: string | File | null; 
    admin_notes?: string; 
    views?: number; 
    clicks_on_discounts?: number; 
    orders_received?: number; 
    cover_image?: string | File | null; 
    bio?: string | null; 
    followers?: number[]; 
}

export interface GetStoreData {
    id: number;
    name: string; 
    logo: string;
    store_type: "DEPT" | "SUPER" | "LOCAL" | "ONLINE"; 
    city: string; 
    district: string; 
    location_link?: string | null; 
    address: string; 
    phone: string; 
    email: string; 
    social_media_links?: Record<string, unknown> | null; 
    latitude?: string | null; 
    longitude?: string | null; 
    is_verified?: boolean; 
    business_registration_number: string; 
    documents?: string | null; 
    admin_notes?: string; 
    views?: number; 
    clicks_on_discounts?: number; 
    orders_received?: number; 
    cover_image?: string | null; 
    bio?: string | null; 
    user: number; 
    followers?: number[]; 

}
