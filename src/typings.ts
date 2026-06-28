/**
 * Convert array bracket notation to dot notation.
 */
export type NormalizePath<T extends string> = T extends `${infer A}[${infer B}]${infer C}`
  ? NormalizePath<`${A}.${B}${C}`>
  : T;

/**
 * Resolve the value type at a given dot-notation path.
 */
export type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? PathValue<T[Key], Rest>
    : any
  : P extends keyof T
    ? T[P]
    : any;
