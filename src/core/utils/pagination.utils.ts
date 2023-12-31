import { In, Like } from "typeorm";
import dataSource from "../db/data-source";
import { FilterPagination } from "../interfaces/fiter.interface";


export function BuildPagination(entity: any, { page, limit, sort, sortBy, ...filters }: FilterPagination) {
    const skip = limit * (page - 1);
    const take = limit;
    let where: Record<string, any> = {};
    let order: Record<string, any> = {};

    const enumColumns = dataSource.getMetadata(entity).ownColumns.filter(column => column.type === 'enum')
    const enumProperties = enumColumns.map(column => column.propertyName);
    Object.keys(filters).forEach(key => {
        const value = filters[key]
        if (value === '') {
            return;
        }
        if (typeof value === 'string' && !enumProperties.includes(key)) {
            where[key] = Like(`%${value}%`)
            return;
        }
        if (enumProperties.includes(key)) {
            where[key] = In(value)
            return;
        }
        where[key] = value
    });
    if (sort != undefined) {
        order[sort] = sortBy;
    }
    return {
        skip,
        take,
        where,
        order
    }
}