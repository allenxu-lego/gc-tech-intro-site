新增一个页面，导航栏的标题是CI/CD Workflow
# 页面上需要画一个流水线，流程是：
- 开发人员提交feature代码到gitlab.。
- 创建merge request向主分支合并代码时，自动发起code review。
- review 如果需要修改，进行代买调整，再重走代码提交的流程，如果无需修改，合并merge request。
# 样式风格
- 流程图的风格专业但美观适合做演示。
- 为用户用开发者，gitlab 等对象，代码提交，Merge Request以及code review等动作适配合适的图标
- 点击行为事件有触发下一任务的动效。