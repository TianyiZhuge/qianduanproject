# Decision Log

Track key architectural and implementation decisions.

---

## [2026-01-14] 使用模板仓库开发酒馆前端

**Decision**: 基于 tavern_helper_template 创建项目
**Context**: 需要开发 SillyTavern 酒馆的前端界面/脚本
**Options Considered**:
- 从零开始搭建
- 使用现成模板
**Choice**: 使用 tavern_helper_template 模板
**Reasoning**: 模板提供完整的自动打包、CDN 发布、实时调试支持
**Trade-offs**: 需要学习模板的约定和结构
**References**: https://github.com/StageDog/tavern_helper_template
