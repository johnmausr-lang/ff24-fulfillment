export interface MSProduct {
  id: string;
  name: string;
  article?: string;
  description?: string;
}

export interface MSInventoryRow {
  assortment: { meta: any; id?: string; name?: string };
  stock: number;
  freeStock: number;
}

export interface MSCounterparty {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface MSSupply {
  id: string;
  name: string;
  created?: string;
}

export interface MSOrder {
  id: string;
  name: string;
  created?: string;
}
