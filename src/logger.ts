import pino from 'pino';

export const logger = pino({
    level: 'info',
    transport: {
        targets: [
            {
                target: 'pino/file',
                options: {
                    destination: './app.log'
                }
            },
            {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        ]
    }
});