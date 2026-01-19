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
};

export type PropertyTypeItem = {
  slug: string;
  name: string;
  route: string;
};
