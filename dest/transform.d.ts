import { DeepArray, Shape } from './type';
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
/**
 * split array by the given window
 * @param arr array
 * @param window the size of the unit
 */
declare const split: <T>(arr: DeepArray<T>, window: Shape) => DeepArray<T>;
export { clone, flat, reshape, split, };
