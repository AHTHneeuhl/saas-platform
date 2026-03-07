import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrgAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const orgId = req.params.orgId;

    const membership = await this.prisma.userOrganization.findFirst({
      where: {
        userId: user.userId,
        orgId,
      },
    });

    if (!membership) {
      throw new ForbiddenException('No organization access');
    }

    return true;
  }
}
