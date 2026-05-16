declare module "sql.js" {
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }
  interface Database {
    exec(sql: string): QueryExecResult[];
    run(sql: string, params?: any[]): Database;
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }
  interface QueryExecResult {
    columns: string[];
    values: any[][];
  }
  interface Statement {
    bind(params?: any[]): boolean;
    step(): boolean;
    getAsObject(params?: Record<string, any>): Record<string, any>;
    get(): any[];
    free(): void;
    reset(): void;
  }
  export default function initSqlJs(config?: any): Promise<SqlJsStatic>;
}
