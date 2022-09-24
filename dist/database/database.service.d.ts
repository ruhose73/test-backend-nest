import { Pool } from 'pg';
declare class DatabaseService {
    private readonly pool;
    constructor(pool: Pool);
    runQuery(query: string, params?: unknown[]): Promise<import("pg").QueryResult<any>>;
}
export default DatabaseService;
