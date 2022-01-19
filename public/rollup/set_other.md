### 异步运行配置文件
```js
import fetch from 'node-fetch';
// rollup.config.js (Promise resolving an array)
export default Promise.all([fetch('get-config-1'), fetch('get-config-2')]);
```

### 获取rollup 命令行参数

```js
import defaultConfig from './rollup.default.config.js';
import debugConfig from './rollup.debug.config.js';

export default commandLineArgs => {
  if (commandLineArgs.configDebug === true) {
    return debugConfig;
  }
  return defaultConfig;
};
```

### 输入提示

JSDoc

```js
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  // ...
};

export default config;
```

jsApi

```js
import { defineConfig } from 'rollup';

export default defineConfig({
  // ...
});
```

### 使用非js 文件当作配置文件,如ts

```shell
rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
```