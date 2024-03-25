export class product {
    id: number;
    name: string;
    price: number;
    urlImage: string;
    partType: string;
    quantity: number;
    qeerebyasali: boolean;
    description: string;
    urlImagetanya: string;
    promo:boolean;

    // Constructor
    constructor(
      id: number,
      name: string,
      price: number,
      urlImage: string,
      partType: string,
      quantity: number,
      qeerebyasali: boolean,
      description: string,
      urlImagetanya: string,
      promo:boolean
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.urlImage = urlImage;
      this.partType = partType;
      this.quantity = quantity;
      this.qeerebyasali = qeerebyasali;
      this.description = description;
      this.urlImagetanya = urlImagetanya;
      this.promo=promo;
    }

    // Setters
    setUrlImage(urlImage: string): void {
      this.urlImage = urlImage;
    }

    setPartType(partType: string): void {
      this.partType = partType;
    }

    setUrlImagetanya(urlImagetanya: string): void {
      this.urlImagetanya = urlImagetanya;
    }
}
