export class product {
    private _id!: number;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    private _name: string | undefined;
    public get name(): string | undefined {
        return this._name;
    }
    public set name(value: string | undefined) {
        this._name = value;
    }
    private _price!: number;
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    private _url_image: string | undefined;
    public get url_image(): string | undefined {
        return this._url_image;
    }
    public set url_image(value: string | undefined) {
        this._url_image = value;
    }
    private _parttype: string | undefined;
    public get parttype(): string | undefined {
        return this._parttype;
    }
    public set parttype(value: string | undefined) {
        this._parttype = value;
    }
    private _quantity!: number;
    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }
    private _qeerebyasali:boolean | undefined;
    public get qeerebyasali():boolean | undefined {
        return this._qeerebyasali;
    }
    public set qeerebyasali(value:boolean | undefined) {
        this._qeerebyasali = value;
    }
    private _description: string | undefined;
    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string | undefined) {
        this._description = value;
    }
    private _url_imagetanya: string | undefined;
    public get url_imagetanya(): string | undefined {
        return this._url_imagetanya;
    }
    public set url_imagetanya(value: string | undefined) {
        this._url_imagetanya = value;
    }
    constructor(id:number,name:string,price:number,url:string,q:number,qe:boolean,url_imagetany:string,descriptio:string){
        this._id=id;
        this._name=name;
        this._price=price;
        this._url_image=url;
        this._quantity=q;
        this.qeerebyasali=qe;
        this.url_imagetanya=url_imagetany;
        this.description=descriptio;
    }


}