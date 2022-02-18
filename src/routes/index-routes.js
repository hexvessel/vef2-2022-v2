import express from 'express';
import { catchErrors } from '../lib/catch-errors.js';
import { listEvents, listRegs } from '../lib/db.js';

export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const events = await listEvents();
  res.render('index', {
    title: 'Viðburðasíðan',
    events,
  });
}

indexRouter.get('/', catchErrors(indexRoute));

export const eventRouter = express.Router();

async function eventRoute(req, res) {
  const events = await listEvents();
  let event;
  for(let i = 0; i < events.length; i++){
    if(req.params.slug === events[i].slug){
      event = events[i];
    }
  }
  const regs = await listRegs(event.id);
  res.render('event', {
    title: event.title,
    info: event.info,
    regs,
  });
}

indexRouter.get('/events/:slug?', catchErrors(eventRoute));

export const loginRouter = express.Router();

async function loginRoute(req, res) {
 
  res.render('login', {
    title: 'Innskráning'
  });
}

indexRouter.get('/admin/login', catchErrors(loginRoute));

// TODO útfæra öll routes
