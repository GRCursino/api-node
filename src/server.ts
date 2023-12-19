import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

import { env } from './env';

import { transactionsRoutes } from './routes/transactions';
import { beneficiariosRoutes } from './routes/beneficiarios';
import { loginRoutes } from './routes/login';
import { profileRoutes } from './routes/profile';
import { refreshRoute } from './routes/refresh';

const app = fastify();

// Configuration

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false, // O cookie salvo não é assinado, ou seja, sem hash 
  },
  sign: {
    expiresIn: '30m'
  }
});

app.register(fastifyCookie);

// Routes

app.register(refreshRoute);

app.register(transactionsRoutes, { prefix: 'transactions' });

app.register(beneficiariosRoutes, { prefix: 'beneficiarios' });

app.register(loginRoutes);


// Authenticated Routes

app.register(profileRoutes);

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP Server Running - api beneficios');
  });
