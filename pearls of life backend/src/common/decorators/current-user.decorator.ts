import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import Users from 'src/modules/users/entities/users.entity';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): any => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    }
);