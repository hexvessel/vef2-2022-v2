import { promises } from 'fs';
import { query, end } from './lib/db.js';

const schemaFile = './sql/schema.sql';

function createFakeEvents(){
  const events = [];
  events.push({
    title: "Hönnuðarhittingur í mars",
    slug: "Honnudarhittingur-i-mars",
    info: "Spennandi hittingur hönnuða í Hönnunarmars"
  });
  events.push({
    title: "Forritarahittingur í febrúar",
    slug: "Forritarahittingur-i-februar",
    info: "Forritarar hittast í febrúar og forrita saman eitthvað frábært"
  });
  events.push({
    title: "Verkefnastjórahittingur í apríl",
    slug: "Verkefnastjorahittingur-i-april",
    info: "Virkilega vel verkefnastýrður hittingur."
  });
  return events;
}

function createFakeRegistrations(){
  const registrations = [];
  registrations.push({
    name: "Forvitinn forritari",
    comment: "Hlakka til að forrita með ykkur",
    event: 1
  });
  registrations.push({
    name: "Forvitinn forritari",
    comment: "Hlakka til að forrita með ykkur",
    event: 2
  });
  registrations.push({
    name: "Forvitinn forritari",
    comment: "Hlakka til að forrita með ykkur",
    event: 3
  });
  return registrations;
}

async function create() {
  const data = await promises.readFile(schemaFile);

  await query(data.toString('utf-8'));

  const fakeEvents = createFakeEvents();
  const fakeRegistrations = createFakeRegistrations();

  for (let i = 0; i < fakeEvents.length; i += 1) {
    const fake = fakeEvents[i];

    try {
      // eslint-disable-next-line no-await-in-loop
      await query(
        `
          INSERT INTO
            events (title, slug, info)
          VALUES
            ($1, $2, $3)`,
        [fake.title,fake.slug,fake.info],
      );
    } catch (e) {
      console.error('Error inserting', e);
      return;
    }
  for (let i = 0; i < fakeRegistrations.length; i += 1) {
    const fake = fakeRegistrations[i];

    try {
      // eslint-disable-next-line no-await-in-loop
      await query(
        `
          INSERT INTO
            registrations (name,comment,event)
          VALUES
            ($1, $2, $3)`,
        [fake.name,fake.comment,fake.event],
      );
    } catch (e) {
      console.error('Error inserting', e);
      return;
    }    
  }

   
}
  await end();

  console.info('Schema & fake data created'); 
}

create().catch((err) => {
  console.error('Error creating running setup', err);
});

