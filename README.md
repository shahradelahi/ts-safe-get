<h1 align="center">
  <sup>@se-oss/safe-get</sup>
  <br>
  <a href="https://github.com/shahradelahi/ts-safe-get/actions/workflows/ci.yml"><img src="https://github.com/shahradelahi/ts-safe-get/actions/workflows/ci.yml/badge.svg?branch=main&event=push" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@se-oss/safe-get"><img src="https://img.shields.io/npm/v/@se-oss/safe-get.svg" alt="NPM Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat" alt="MIT License"></a>
  <a href="https://bundlephobia.com/package/@se-oss/safe-get"><img src="https://img.shields.io/bundlephobia/minzip/@se-oss/safe-get" alt="npm bundle size"></a>
  <a href="https://packagephobia.com/result?p=@se-oss/safe-get"><img src="https://packagephobia.com/badge?p=@se-oss/safe-get" alt="Install Size"></a>
</h1>

_@se-oss/safe-get_ is a lightweight, secure, and type-safe nested property retriever supporting bracket notation and automatic function context binding.

---

- [Installation](#-installation)
- [Usage](#-usage)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#license)

## 📦 Installation

```bash
npm install @se-oss/safe-get
```

<details>
<summary>Install using your favorite package manager</summary>

**pnpm**

```bash
pnpm add @se-oss/safe-get
```

**yarn**

```bash
yarn add @se-oss/safe-get
```

</details>

## 📖 Usage

### Basic Usage

Retrieve nested properties using standard dot-notation path.

```ts
import { safeGet } from '@se-oss/safe-get';

const obj = { a: { b: { c: 'hello' } } };
const value = safeGet(obj, 'a.b.c'); // 'hello'
```

### Array Bracket Notation

Supports both array bracket notation and standard index dot notation.

```ts
const obj = { users: [{ name: 'Alice' }, { name: 'Bob' }] };

safeGet(obj, 'users[0].name'); // 'Alice'
safeGet(obj, 'users.1.name'); // 'Bob'
```

### Fallback Default Value

Easily provide a fallback default value if the path resolves to `undefined`.

```ts
const obj = { a: { b: 1 } };

safeGet(obj, 'a.c', 'fallback'); // 'fallback'
```

### Secure Prototype Protection

Guaranteed defense against prototype pollution by blacklisting sensitive keys like `__proto__`, `constructor`, and `prototype`.

```ts
const obj = {};

safeGet(obj, '__proto__.polluted'); // undefined
```

### Function Context Binding

Automatically binds the parent object's context when resolving and invoking nested functions.

```ts
const obj = {
  user: {
    firstName: 'John',
    lastName: 'Doe',
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};

safeGet(obj, 'user.getFullName'); // 'John Doe'
```

### Pure TypeScript Type Safety

Strong type inference for objects and paths, resolving types perfectly.

```ts
const obj = { user: { age: 25 } };

// TypeScript infers 'age' as number type automatically!
const age = safeGet(obj, 'user.age');
```

## 📚 Documentation

For all configuration options, please see [the API docs](https://www.jsdocs.io/package/@se-oss/safe-get).

## 🤝 Contributing

Want to contribute? Awesome! To show your support is to star the project, or to raise issues on [GitHub](https://github.com/shahradelahi/ts-safe-get).

Thanks again for your support, it is much appreciated! 🙏

## License

[MIT](/LICENSE) © [Shahrad Elahi](https://github.com/shahradelahi) and [contributors](https://github.com/shahradelahi/ts-safe-get/graphs/contributors).
