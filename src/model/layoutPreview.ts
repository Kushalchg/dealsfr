type ValuesArray = [number, number, number] | [number, number, number, number];

export interface LayoutItem {
  id?: number;
  name: string;
  layout_array: ValuesArray;
  store: number;
}
