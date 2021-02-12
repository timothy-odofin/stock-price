

export class CompanyList {
    data: string[][]
    columns: ColumnsData[]
    meta: Meta
}
export class ColumnsData {
    name: string
    type: string
}
export class Meta {
    next_cursor_id: any
}
export class Company{
    label:string
    value:string
}
export class StockDetails{
    ticker:string 
    shares_outstanding:number
    nav:number
    flow_daily:number
    as_of_date:string
}
export class MonthsData{
    jan:number
    feb:number
    mar:number
    apr:number
    may:number
    jun:number
    jul:number
    aug:number
    sep:number
    oct:number
    nov:number
    dec:number
    color:string
}
export class SeriesData{
    dateresult:number 
    rate:number 
    
}




