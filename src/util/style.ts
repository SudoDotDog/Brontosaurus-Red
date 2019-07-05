/**
* @author WMXPY
* @namespace Util
* @description Style
*/

export const combineClasses = (...classes: Array<string | null | undefined>) => {

    return classes.filter(Boolean).join(' ');
};
