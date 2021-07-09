import spdy from 'spdy';
import express, { Router, Handler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { serverConfig } from './config';

export interface Route {
  path: string;
  handler: Router | Handler;
}
export class Server {
  private _httpServer: spdy.Server;
  private express: express.Application;
  private _schema: GraphQLSchema;

  constructor() {
    this.express = express();
    this._httpServer = spdy.createServer({
      cert: serverConfig.serverCert,
      key: serverConfig.serverKey
    }, this.express);
    this.middleware();
  }

  get httpServer() {
    return this._httpServer;
  }

  public init = (port: number) => {
    this.httpServer.listen(port, () => {
      console.log(`server started on port ${port}`);
    });
  };

  public registerMiddleware = (middleware: Array<Handler>) => {
    middleware.forEach(middleware => this.express.use(middleware));
  };

  public registerRoutes = (routes: Array<Route>) => {
    routes.forEach(route => {
      this.express.use(route.path, route.handler);
    });
  };

  public addApollo = (apollo: ApolloServer, schema: GraphQLSchema) => {
    this._schema = schema;
    apollo.applyMiddleware({
      app: this.express
    });
  };

  private middleware() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }
}
