"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://51.250.96.239:3000',
            'http://0.0.0.0:8080',
        ],
    });
    await app.listen(8181);
}
bootstrap();
//# sourceMappingURL=main.js.map