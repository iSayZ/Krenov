import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface JwtPayload {
  session: string;
  sub: string;
  access_level: string;
  iat: number;
  exp: number;
}

export const User = createParamDecorator(
  (
    data: keyof JwtPayload,
    ctx: ExecutionContext
  ): JwtPayload | string | number => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    return data ? user?.[data] : user;
  }
);
