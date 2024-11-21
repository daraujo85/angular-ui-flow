export default class CardModel {
  type!: string;
  title!: string;
  titleBackground: string = "#2b2b2b2e";
  cardBackground: string = "#212121";
  inputs: string[] = [];
  outputs: string[] = [];
  options: string[] = [];
  configs: { [key: string]: any }[] = [];
  initialLeft?: string;
  initialTop?: string;

  constructor(type: string, title: string, options: string[], inputs: string[], outputs: string[], configs: { [key: string]: any }[], titleBackground: string = "", cardBackground: string = "#212121",  initialLeft?: string,
  initialTop?: string) {
    this.type = type;
    this.title = title;
    this.titleBackground = titleBackground ?? "#2b2b2b2e";
    this.cardBackground = cardBackground;
    this.options = options;
    this.inputs = inputs;
    this.outputs = outputs;
    this.configs = configs;
    this.initialLeft = initialLeft;
    this.initialTop = initialTop;
  }
}
