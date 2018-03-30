export class ExpressMysqlSessionConfig {
	public host = 'localhost';
	public port = 3306;
	public user = 'root';
	public password = 'root';
  public database = 'bw_tech_node';

  public getConfig() {
    return {
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database
    };
  }
}