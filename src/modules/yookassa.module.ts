import { Module } from '@nestjs/common';
import { YookassaService } from 'src/services/yookassa.service';

@Module({
  imports: [],
  providers: [YookassaService],
  controllers: [],
  exports: [YookassaService],
})
export class YookassaModule {}
