import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerRequest } from '@nestjs/throttler';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  private getRouteSpecificMessage(path: string, ttl: number): string {
    const ttlInMinutes = Math.floor(ttl / 60000);

    // Specific messages per route
    const routeMessages: Record<string, string> = {
      '/auth/verify-2fa': `Trop de tentatives de vérification 2FA. Veuillez patienter ${ttlInMinutes} minute(s) avant d'essayer à nouveau.`,
      '/2fa/verify-2fa': `Trop de tentatives de vérification 2FA. Veuillez patienter ${ttlInMinutes} minute(s) avant d'essayer à nouveau.`,
      '/auth/login': `Trop de tentatives de connexion. Veuillez patienter ${ttlInMinutes} minute(s) avant d'essayer à nouveau.`,
      '/auth/verify-identity': `Trop de tentatives de vérification. Veuillez patienter ${ttlInMinutes} minute(s) avant d'essayer à nouveau.`,
    };

    return (
      routeMessages[path] ||
      `Trop de requêtes. Veuillez patienter ${ttlInMinutes} minute(s) avant d'essayer à nouveau..`
    );
  }

  protected async handleRequest(
    requestProps: ThrottlerRequest
  ): Promise<boolean> {
    const { ttl } = requestProps; // Get limit and ttl from requestProps
    const context: ExecutionContext = requestProps.context; // Retrieve the context if necessary

    const request = context.switchToHttp().getRequest();
    const path = request.route?.path || request.path;

    try {
      return await super.handleRequest(requestProps);
    } catch {
      // Define a specific error message
      const errorMessage = this.getRouteSpecificMessage(path, ttl);

      // Throw a 429 error with the appropriate message
      throw new HttpException(errorMessage, HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    const ip =
      req.ip ||
      req.connection.remoteAddress ||
      req.headers['x-forwarded-for']?.split(',')[0];

    return ip; // Return the IP address as the tracking key
  }
}
