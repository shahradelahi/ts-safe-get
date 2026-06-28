import { describe, expect, expectTypeOf, it } from 'vitest';

import { safeGet } from './index';

describe('safeGet', () => {
  it('should fetch standard nested properties (basic access)', () => {
    const obj = { a: { b: { c: 'hello' } } };
    expect(safeGet(obj, 'a.b.c')).toBe('hello');
  });

  it('should resolve array notation correctly', () => {
    const obj = { users: [{ name: 'Alice' }, { name: 'Bob' }] };
    expect(safeGet(obj, 'users[0].name')).toBe('Alice');
    expect(safeGet(obj, 'users.1.name')).toBe('Bob');
  });

  it('should return defaultValue if path resolves to undefined', () => {
    const obj = { a: { b: { c: 'hello' } } };
    expect(safeGet(obj, 'a.b.d', 'fallback')).toBe('fallback');
    expect(safeGet(obj, 'x.y.z', 'fallback')).toBe('fallback');
    expect(safeGet(null as any, 'a.b.c', 'fallback')).toBe('fallback');
  });

  it('should prevent prototype pollution lookups (security)', () => {
    const obj = {};
    expect(safeGet(obj, '__proto__.polluted' as any)).toBeUndefined();
    expect(safeGet(obj, 'constructor.prototype.polluted' as any)).toBeUndefined();
  });

  it('should bind this context for nested functions (context binding)', () => {
    const obj = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        getFullName() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    };
    expect(safeGet(obj, 'user.getFullName')).toBe('John Doe');
  });

  it('should infer correct TypeScript types', () => {
    const obj = { user: { age: 25, name: 'Alice' } };
    expectTypeOf(safeGet(obj, 'user.age')).toEqualTypeOf<number>();
    expectTypeOf(safeGet(obj, 'user.name')).toEqualTypeOf<string>();
  });
});
