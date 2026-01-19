export type LocationItem = {
  slug: string;
  name: string;
  parent?: string;
  route: string;
  type: "city" | "district" | "neighborhood" | "remote";
  description?: string;
  medianPrice?: string;
};

export type ServiceItem = {
  slug: string;
  name: string;
  route: string;
  short: string;
  category: string;
};

export type PropertyTypeItem = {
  slug: string;
  name: string;
  route: string;
};

export type InventoryCategory = {
  slug: string;
  name: string;
  route: string;
  note?: string;
};

export type PageLayoutVariant = {
  key: string;
  label: string;
  description: string;
  sections: string[];
  features: Record<string, any>;
};

export type LayoutAssignments = {
  services: Record<string, string>;
  locations: Record<string, string>;
};

export type ResourceLink = {
  key: string;
  label: string;
  href: string;
};
