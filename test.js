const date1 = new Date("2023-07-25")
const date2 = new Date("2023-07-26")

function compareDate(date1, date2) {
    if (date1 < date2) {
        return `${date1} đứng trước ${date2}`;
    } else if (date1 > date2) {
        return `${date1} đứng sau ${date2}`;
    } else {
        return `${date1} và ${date2} là cùng một ngày`;
    }
}
console.log(compareDate(date1, date2))