export interface RepairService {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

export interface DeviceCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name
  repairs: RepairService[];
  popularModels: string[];
}

export interface AccessoryItem {
  id: string;
  name: string;
  category: 'smartphones' | 'tablets' | 'computers';
  price: number;
  description: string;
  features: string[];
  inStock: boolean;
  tag?: string; // e.g. "Populaire", "Nouveau"
}

export interface UserMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
  deviceType?: string;
}
