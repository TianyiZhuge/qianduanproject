# Code Landmarks

Quick reference to important parts of the codebase.

## Entry Points
| Location | Purpose |
|----------|---------|
| src/*/index.ts | 项目入口文件 |
| 示例/界面示例/index.ts | Vue 界面示例入口 |
| 示例/脚本示例/index.ts | 脚本示例入口 |

## Core Business Logic
| Location | Purpose |
|----------|---------|
| util/common.ts | 通用工具函数 |
| util/mvu.ts | MVU 数据存储框架 |

## Configuration
| Location | Purpose |
|----------|---------|
| webpack.config.ts | Webpack 打包配置 |
| tavern_sync.yaml | 酒馆同步配置 |
| tsconfig.json | TypeScript 配置 |

## Key Patterns
| Pattern | Example Location | Notes |
|---------|------------------|-------|
| Vue 组件 | 示例/界面示例/*.vue | Vue 3 SFC |
| 脚本加载 | 示例/脚本示例/加载和卸载时执行函数.ts | jQuery 生命周期 |
| MVU 状态 | util/mvu.ts | Pinia + Zod 验证 |

## Testing
| Location | Purpose |
|----------|---------|
| dist/ | 构建输出目录 |

## Gotchas & Non-Obvious Behavior
| Location | Issue | Notes |
|----------|-------|-------|
| dist/ | CI 自动覆盖 | 不要手动修改 |
| @no-ci | 文件开头标记 | 跳过 CI 打包 |
| @obfuscate | 文件开头标记 | 启用代码混淆 |
