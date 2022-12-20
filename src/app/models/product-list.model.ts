export interface Products{
    id:string,
    name:string,
    currency: string,
    amount: number,
    url: string

}

export interface Query  {
    products: Products[];
}


