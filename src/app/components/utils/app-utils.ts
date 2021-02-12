export class AppUtil {
    public static OPEN='Open';
    public static LOW='Low';
    public static HIGH='High';
 }
 export function getDate(date){
    let month:any = new Date(date).getMonth() + 1;
    let day:any =  new Date(date).getDate();
    let year:any =   new Date(date).getFullYear();

    month = month < 10 ? '0'+ month : month;
    day = day < 10 ? '0'+day : day;

    return year + '-' + month + '-' + day
}