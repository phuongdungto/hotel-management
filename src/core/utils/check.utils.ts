export function minusDate(date1: Date, date2: Date): number {
    const differenceInMilliseconds = date1.getTime() - date2.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

export function getIds(entityArr: any, property: string) {
    const arr = entityArr.map((item: any) => {
        return item[property]
    })
    return arr;
}