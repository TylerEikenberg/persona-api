enum LogType {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const logging = (
  logType: LogType,
  namespace: string,
  message: string,
  object?: any
) => {
  if (object) {
    console[logType](
      `[${getTimeStamp()}] [${logType.toLocaleUpperCase()}] [${namespace}] ${message}`,
      object
    );
  } else {
    console[logType](
      `[${getTimeStamp()}] [${logType.toLocaleUpperCase()}] [${namespace}] ${message}`
    );
  }
};

const info = (namespace: string, message: string, object?: any) => {
  logging(LogType.INFO, namespace, message, object);
};

const warn = (namespace: string, message: string, object?: any) => {
  logging(LogType.WARN, namespace, message, object);
};

const error = (namespace: string, message: string, object?: any) => {
  logging(LogType.ERROR, namespace, message, object);
};

const debug = (namespace: string, message: string, object?: any) => {
  logging(LogType.DEBUG, namespace, message, object);
};

export default { info, warn, error, debug };
