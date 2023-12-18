import { MongoError } from 'mongodb'
import winston, { Logger } from 'winston'

export const winstonLogger: Logger = winston.createLogger({
   level: 'info',
   format: winston.format.json(),
   transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
   ],
})

if (process.env.NODE_ENV !== 'production') {
   winstonLogger.add(
      new winston.transports.Console({
         format: winston.format.simple(),
      }),
   )
}

export const logMongoError = (context: Record<string, any>, error: MongoError) => {
   winstonLogger.error({
      context: { ...context },
      name: error.name,
      message: error.message,
      cause: error.cause,
      code: error.code,
      stack: error.stack,
   })
}

export const logError = (context: Record<string, any>, error: unknown) => {
   winstonLogger.error({
      context: { ...context },
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : 'Unknown error',
      cause: error instanceof Error ? error.cause : undefined,
      stack: error instanceof Error ? error.stack : null,
   })
}
