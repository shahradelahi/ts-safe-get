import type { NormalizePath, PathValue } from './typings';

const BLACKLIST = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Get nested value from object via path.
 *
 * @example
 * safeGet({ a: { b: 1 } }, 'a.b') // 1
 * safeGet({ a: [{ b: 2 }] }, 'a[0].b') // 2
 */
export function safeGet<T, P extends string>(
  obj: T,
  path: P
): NormalizePath<P> extends string ? PathValue<T, NormalizePath<P>> : any;

/**
 * Get nested value from object via path, fallback to default if undefined.
 *
 * @example
 * safeGet({ a: 1 }, 'b', 'fallback') // 'fallback'
 */
export function safeGet<T, P extends string, D>(
  obj: T,
  path: P,
  defaultValue: D
): NormalizePath<P> extends string ? PathValue<T, NormalizePath<P>> | D : any;

/**
 * Get nested value from object. Supports dot/bracket notation and function context binding.
 */
export function safeGet(obj: any, path: string, defaultValue?: any): any {
  if (obj === null || obj === undefined) {
    return defaultValue;
  }

  // Normalize array brackets (e.g., users[0].name becomes users.0.name)
  const normalizedPath = path.replace(/\[([^\]]+)\]/g, '.$1');
  // Split path by . (ignoring ? tokens for compatibility)
  const parts = normalizedPath.replace(/\?/g, '').split('.');

  let current: any = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return defaultValue;
    }

    if (BLACKLIST.has(part)) {
      return undefined;
    }

    if (typeof current !== 'object' && typeof current !== 'function') {
      try {
        current = (current as any)[part];
      } catch {
        return defaultValue;
      }
    } else {
      if (part in current) {
        current = current[part];
      } else {
        return defaultValue;
      }
    }
  }

  if (typeof current === 'function') {
    let parentObj: any = obj;
    if (parts.length > 1) {
      parentObj = safeGet(obj, parts.slice(0, -1).join('.'));
    }
    current = current.call(parentObj);
  }

  return current === undefined ? defaultValue : current;
}
