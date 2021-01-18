import { DeepArray } from './type';
declare const flat: (arr: any[]) => any[];
/**
 * reshape array
 * @param arr array
 * @param shape wanted shape of target array
 */
declare const reshape: <T>(arr: DeepArray<T>, shape: number[]) => DeepArray<T>;
/**
 * deep clone an array
 * @param arr array
 */
declare const clone: (arr: any[]) => any[];
export { clone, flat, reshape, };
