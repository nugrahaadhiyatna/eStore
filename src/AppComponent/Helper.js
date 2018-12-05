import moment from "moment";

export function formatStandardDate(date) {
    if(date){
        return moment().format('DD/MM/YYYY h:mm');
    }
    return "";
}

export function sortObject(a, b, key) {
    return (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0
}