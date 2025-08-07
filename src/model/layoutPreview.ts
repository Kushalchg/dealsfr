type ValuesArray = [number, number, number] | [number, number, number, number];

export default interface LayoutPreview {
  name: string;
  values: ValuesArray;
  store: number;
}
