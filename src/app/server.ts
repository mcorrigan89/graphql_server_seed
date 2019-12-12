import http from 'http';
import express, { Router, Handler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

export interface Route {
  path: string;
  handler: Router | Handler
}

export class Server {
  private httpServer: http.Server;
  private express: express.Application;

  constructor() {
    this.express = express();
    this.httpServer = http.createServer(this.express);
    this.middleware();
  }

  public init = (port: number) => {  
    this.httpServer.listen(port, () => {
      console.log(`server started on port ${port}`);
    })
  }

  public registerMiddleware = (middleware: Array<Handler>) => {
    middleware.forEach(middleware => this.express.use(middleware));
  }

  public registerRoutes = (routes: Array<Route>) => {
    routes.forEach(route => {
      this.express.use(route.path, route.handler);
    })
  }

  public addApollo = (apollo: ApolloServer) => {
    apollo.applyMiddleware({
      app: this.express
    });
  }

  private middleware() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }
}