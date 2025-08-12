type ValuesArray = [number, number, number] | [number, number, number, number];

export default interface LayoutPreview {
  id?: number;
  name: string;
  layout_array: ValuesArray;
  store: number;
}
