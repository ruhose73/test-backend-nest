"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_OPTIONS = exports.ConfigurableDatabaseModule = exports.CONNECTION_POOL = void 0;
const common_1 = require("@nestjs/common");
exports.CONNECTION_POOL = 'CONNECTION_POOL';
_a = new common_1.ConfigurableModuleBuilder()
    .setClassMethodName('forRoot')
    .build(), exports.ConfigurableDatabaseModule = _a.ConfigurableModuleClass, exports.DATABASE_OPTIONS = _a.MODULE_OPTIONS_TOKEN;
//# sourceMappingURL=database.module-definition.js.map