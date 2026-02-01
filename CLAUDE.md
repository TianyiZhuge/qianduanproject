# 酒馆助手前端界面或脚本编写

<<<<<<< HEAD
## Skills
Read and follow these skills before writing any code:
- .claude/skills/base/SKILL.md
- .claude/skills/security/SKILL.md
- .claude/skills/typescript/SKILL.md
- .claude/skills/react-web/SKILL.md
- .claude/skills/session-management/SKILL.md

## 项目专属规则
@.cursor/rules/项目基本概念.mdc
@.cursor/rules/mcp.mdc
@.cursor/rules/酒馆变量.mdc
=======
@.cursor/rules/项目基本概念.mdc
@.cursor/rules/mcp.mdc
@.cursor/rules/酒馆变量.mdc
@.cursor/rules/酒馆助手接口.mdc
>>>>>>> 16edc141e7d72f16a6a44f9c15b766d155937e2d
@.cursor/rules/前端界面.mdc
@.cursor/rules/脚本.mdc
@.cursor/rules/mvu变量框架.mdc
@.cursor/rules/mvu角色卡.mdc
<<<<<<< HEAD

## Project Overview
基于 tavern_helper_template 开发 SillyTavern 酒馆的前端界面和脚本。

## Tech Stack
- Language: TypeScript
- Framework: Vue 3 / React 19
- Build: Webpack 5
- Styling: Tailwind CSS 4, Sass
- State: Pinia 3
- Validation: Zod
- Deployment: GitHub Actions + jsdelivr CDN

## Key Commands
```bash
# 安装依赖
pnpm install

# 开发模式（监听代码变化）
pnpm watch

# 生产模式打包
pnpm build

# 格式化代码
pnpm format

# 代码检查
pnpm lint:fix

# 酒馆同步
pnpm sync
```

## 项目结构
```
src/              # 你的源代码
示例/             # 参考示例
  ├── 界面示例/   # Vue 界面示例
  ├── 脚本示例/   # 脚本示例
  └── 角色卡示例/ # 角色卡配置示例
dist/             # 自动生成的打包文件
util/             # 工具函数库
```

## CDN 引用
```javascript
// 脚本
import 'https://testingcf.jsdelivr.net/gh/TianyiZhuge/qianduanproject/dist/项目名/index.js'

// 界面
$('body').load('https://testingcf.jsdelivr.net/gh/TianyiZhuge/qianduanproject/dist/项目名/index.html')
```

## Documentation
- `docs/` - Technical documentation
- `_project_specs/` - Project specifications and todos
- `.cursor/rules/` - 酒馆开发专属规则

## Session Management
- `_project_specs/session/current-state.md` - 当前会话状态
- `_project_specs/session/decisions.md` - 决策记录
- `_project_specs/session/code-landmarks.md` - 代码导航

## 注意事项
- 不要手动修改 `dist/` 目录，CI 会自动覆盖
- 在文件开头加 `// @no-ci` 可跳过 CI 打包
- 在文件开头加 `// @obfuscate` 可混淆代码
=======
>>>>>>> 16edc141e7d72f16a6a44f9c15b766d155937e2d
