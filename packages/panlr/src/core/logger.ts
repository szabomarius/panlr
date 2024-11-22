// logger.ts
type LogFunction = (...args: unknown[]) => void;
const noop = () => {};
/**
 * TODO: pipe the NODE_ENV through .env in turborepo
 * would be nice to have a different .env variable for the logging itself,
 * like LOG_LEVEL=debug or LOG_LEVEL=production as the default
 * TODO: would be nice to have a message attached to the log and then the data
 * this would be especially useful for the table log in that it would be easier to read
 * maybe this is a good use case for mojilogger package :)
 */
export const loggr = {
    // TODO:
    debug: (process.env.NODE_ENV === 'development'
        ? (...args: unknown[]) => console.debug(...args)
        : noop) as LogFunction,
    // TODO: pipe the NODE_ENV through .env in turborepo
    table: (process.env.NODE_ENV === 'development'
        ? (...args: unknown[]) => console.table(...args)
        : noop) as LogFunction,
};
