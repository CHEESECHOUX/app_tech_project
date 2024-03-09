import { camelCase } from 'lodash';

export const convertToCamelCase = (obj: any): any => {
    return Object.keys(obj).reduce((acc, key) => {
        const camelKey = camelCase(key);
        acc[camelKey] = obj[key];
        return acc;
    }, {});
};
