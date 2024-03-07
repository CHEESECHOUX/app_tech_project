import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
    private readonly logLevels: string[];

    constructor(context?: string) {
        super(context);

        this.logLevels = process.env.NODE_ENV === 'development' ? ['error', 'warn', 'log', 'debug', 'verbose'] : ['error', 'warn', 'log'];
    }

    verbose(message: any, ...optionalParams: any[]) {
        if (this.logLevels.includes('verbose')) {
            super.verbose(`💬 [VERBOSE] ${message}`, ...optionalParams);
        }
    }

    debug(message: any, ...optionalParams: any[]) {
        if (this.logLevels.includes('debug')) {
            super.debug(`🐛 [DEBUG] ${message}`, ...optionalParams);
        }
    }

    log(message: any, ...optionalParams: any[]) {
        if (this.logLevels.includes('log')) {
            super.log(`☀️ [LOG] ${message}`, ...optionalParams);
        }
    }

    warn(message: any, ...optionalParams: any[]) {
        if (this.logLevels.includes('warn')) {
            super.warn(`🚨 [WARN] ${message}`, ...optionalParams);
        }
    }

    error(message: any, trace?: string, context?: string) {
        if (this.logLevels.includes('error')) {
            super.error(`❌ [ERROR] ${message}`, trace, context);
        }
    }
}
