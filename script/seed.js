const { db, models: { User, Trip, TripAttendee, TripEvent, EventAttendee } } = require('../server/db')

//  * seed - this function clears the database and populates it with test data.
async function seed() {
  await db.sync({ force: true }) // clears database
  console.log('db synced!')

  // Create users
  const users = await Promise.all([
    User.create({ username: 'cody@fsa.com', name: 'Cody', password: '123' }),
    User.create({ username: 'murphy@fsa.com', name: 'Murphy', password: '123' }),
    User.create({ username: 'lucy@fsa.com', name: 'Lucy', password: '123' }),
    User.create({ username: 'konstantin@fsa.com', name: 'Konstantin', password: '123' }),
    User.create({ username: 'ayan@fsa.com', name: 'Ayan', password: '123' }),
    User.create({ username: 'john@fsa.com', name: 'John', password: '123' }),
    User.create({ username: 'shanntal@fsa.com', name: 'Shanntal', password: '123' }),
  ])

  console.log(`seeded ${users.length} users`)

  // create a trip
  const trips = await Promise.all([
    Trip.create({ name: 'Disney trip',
                  destination: 'Orlando, FL', 
                  startDate: '2021-11-15', endDate: '2021-11-25', 
                  purpose: 'RELAX', status: 'IN PROGRESS', ownerId: users[0].id,
                }),
    Trip.create({ 
                  name: 'Holiday trip',
                  destination: 'New York City, NY', 
                  startDate: '2021-10-06', endDate: '2021-10-31', 
                  purpose: 'RELAX', status: 'IN PROGRESS', ownerId: users[0].id,
              }),
    Trip.create({ 
                name: 'Italy trip',
                destination: 'Rome, Italy', 
                startDate: '2021-12-20', endDate: '2021-12-22', 
                purpose: 'VACATION', status: 'IN PROGRESS', ownerId: users[0].id,
            })
  ])

  console.log(`seeded ${trips.length} trips`)

  // create trip attendees
  const tripAttendees = await Promise.all([
    TripAttendee.create({ tripId: trips[2].id, userId: users[3].id, email: 'email1@something.com' }),
    TripAttendee.create({ tripId: trips[2].id, userId: users[4].id, email: 'email2@something.com' }),
  ])

  console.log(`seeded ${tripAttendees.length} trip attendees`)

  // create events
  const events = await Promise.all([

    //2021-10-20
    //SLEEP
    TripEvent.create({ purpose: 'SLEEP', placeName: 'iQ Hotel Roma', description: 'iQ Hotel Roma', 
    url: 'https://www.yelp.com/biz/iq-hotel-roma-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-22',
                  location: "Via Firenze 8, 00184 Rome, Italy",
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'DINNER', description: 'Zero Settenta Cinque', placeName: 'Zero Settenta Cinque',
                  location: "Via dei Cerchi 6500186 RomeItaly",
                  url: 'https://www.yelp.com/biz/zero-settenta-cinque-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'DINNER', description: 'Osteria Circo', placeName: 'Osteria Circo',
                  location: 'Via dei Cerchi 7900186 RomeItaly',
                  url: 'https://www.yelp.com/biz/osteria-circo-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'DINNER', description: 'Benso', placeName: 'Benso',
                  location: 'Via dei Fori Imperiali 100186 RomeItaly',
                  url: 'https://www.yelp.com/biz/benso-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'Osteria del Gnocco fritto', placeName: 'Osteria del Gnocco fritto',
                  location: 'Ripa di porta Ticinese angolo via Paoli20100 RomeItaly',
                  url: 'https://www.yelp.com/biz/osteria-del-gnocco-fritto-no-title?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'Pizza al Massimo', placeName: 'Pizza al Massimo',
                  location: 'Via dei Cerchi 5500186 RomeItaly',
                  url: 'https://www.yelp.com/biz/pizza-al-massimo-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'St. Teodoro', placeName: 'St. Teodoro',
                  location: 'Via dei Fienili 4900186 RomeItaly',
                  url: 'https://www.yelp.com/biz/st-teodoro-roma-2?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'BREAKFAST', description: 'St. Teodoro', placeName: 'St. Teodoro',
                  location: 'Via dei Fienili 4900186 RomeItaly',
                  url: 'https://www.yelp.com/biz/st-teodoro-roma-2?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'BREAKFAST', description: 'Benso', placeName: 'Benso',
                  location: 'Via dei Fori Imperiali 100186 RomeItaly',
                  url: 'https://www.yelp.com/biz/benso-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'AFTERNOONACTIVITY', description: 'Top Bike Rental and Tours', placeName: 'Top Bike Rental and Tours',
                  url: 'https://www.yelp.com/biz/top-bike-rental-and-tours-roma-2?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',  
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'AFTERNOONACTIVITY', description: 'Parco Villa Borghese', placeName: 'Parco Villa Borghese',
                  url: 'https://www.yelp.com/biz/parco-villa-borghese-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',  
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'NIGHTACTIVITY', description: 'Villa Doria Pamphilj', placeName: 'Villa Doria Pamphilj',
                  url: 'https://www.yelp.com/biz/villa-doria-pamphilj-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'NIGHTACTIVITY', description: 'Giardino degli Aranci', placeName: 'Giardino degli Aranci',
                  url: 'https://www.yelp.com/biz/giardino-degli-aranci-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'MORNINGACTIVITY', description: 'Piazza di Spagna', placeName: 'Piazza di Spagna',
                  location: '',
                  url: 'https://www.yelp.com/biz/piazza-di-spagna-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA', 
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'MORNINGACTIVITY', description: 'Piazza del Campidoglio', placeName: 'Piazza del Campidoglio',
                  url: 'https://www.yelp.com/biz/piazza-del-campidoglio-roma-2?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA', 
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'MORNINGACTIVITY', description: 'Creuza de Ma', placeName: 'Creuza de Ma',
                  url: 'https://www.yelp.com/biz/creuza-de-ma-maccarese?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA', 
                  startDate: '2021-12-20', endDate: '2021-12-20', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'OTHER', placeName: 'Villa Ada', description: 'Villa Ada', 
                  url: 'https://www.yelp.com/biz/villa-ada-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-20', endDate: '2021-12-20',
                  status: 'PROPOSED', tripId: trips[2].id }), 
    TripEvent.create({ purpose: 'DINNER', description: 'La Taberna', placeName: 'La Taberna',
                  location: 'Via Ardeatina KM 1350000100 RomeItaly',
                  url: 'https://www.yelp.com/biz/la-taberna-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'DINNER', description: 'Angelino ai Fori', placeName: 'Angelino ai Fori',
                  location: 'Largo Corrado Ricci 4000184 RomeItaly',
                  url: 'https://www.yelp.com/biz/angelino-ai-fori-roma-4?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'InRoma', placeName: 'InRoma',
                  location: 'Via dei Fienili 5600186 RomeItaly',
                  url: 'https://www.yelp.com/biz/inroma-roma-2?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'Pizzeria Imperiale', placeName: 'Pizzeria Imperiale',
                  location: 'Largo Corrado Ricci 3700184 RomeItaly',
                  url: 'https://www.yelp.com/biz/pizzeria-imperiale-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'Anima Mundi', placeName: 'Anima Mundi',
                  location: 'Via del Velabro 100186 RomeItaly',
                  url: 'https://www.yelp.com/biz/anima-mundi-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'BREAKFAST', description: 'Iari The Vino', placeName: 'Iari The Vino',
                  location: 'Via del Colosseo 500184 RomeItaly',
                  url: 'https://www.yelp.com/biz/iari-the-vino-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'BREAKFAST', description: 'Unique al Palatino', placeName: 'Unique al Palatino',
                  location: 'Via di San Teodoro 4800186 RomeItaly',
                  url: 'https://www.yelp.com/biz/unique-al-palatino-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'AFTERNOONACTIVITY', description: 'Piazza di Spagna', placeName: 'Piazza di Spagna',
                  location: 'Via dei Cerchi 5500186 RomeItaly',
                  url: 'https://www.yelp.com/biz/piazza-di-spagna-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',  
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'AFTERNOONACTIVITY', description: 'Giardino degli Aranci', placeName: 'Giardino degli Aranci',
                  url: 'https://www.yelp.com/biz/giardino-degli-aranci-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',  
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'NIGHTACTIVITY', description: 'Parco Villa Borghese', placeName: 'Parco Villa Borghese',
                  url: 'https://www.yelp.com/biz/parco-villa-borghese-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'NIGHTACTIVITY', description: 'Villa Doria Pamphilj', placeName: 'Villa Doria Pamphilj',
                  url: 'https://www.yelp.com/biz/villa-doria-pamphilj-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'OTHER', description: 'Piazza del Campidoglio', placeName: 'Piazza del Campidoglio',
                  url: 'https://www.yelp.com/biz/piazza-del-campidoglio-roma-2?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-21', endDate: '2021-12-21',
                  status: 'PROPOSED', tripId: trips[2].id }), 
    TripEvent.create({ purpose: 'DINNER', purpose: 'BREAKFAST', description: 'Unique al Palatino', placeName: 'Unique al Palatino',
                  location: 'Via di San Teodoro 4800186 RomeItaly',
                  url: 'https://www.yelp.com/biz/unique-al-palatino-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'DINNER', description: 'Pizzeria Imperiale', placeName: 'Pizzeria Imperiale',
                  location: 'Largo Corrado Ricci 3700184 RomeItaly',
                  url: 'https://www.yelp.com/biz/pizzeria-imperiale-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'Benso', placeName: 'Benso',
                  location: 'Via dei Fori Imperiali 100186 RomeItaly',
                  url: 'https://www.yelp.com/biz/benso-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',         
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'BREAKFAST', description: 'Pizza al Massimo', placeName: 'Pizza al Massimo',
                  location: 'Via dei Cerchi 5500186 RomeItaly',
                  url: 'https://www.yelp.com/biz/pizza-al-massimo-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'AFTERNOONACTIVITY', placeName: 'Roseto Comunale', description: 'Roseto Comunale', 
                  url: 'https://www.yelp.com/biz/roseto-comunale-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',  
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'AFTERNOONACTIVITY', description: 'Giardino degli Aranci', placeName: 'Giardino degli Aranci',
                  url: 'https://www.yelp.com/biz/giardino-degli-aranci-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',  
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'NIGHTACTIVITY', description: 'Parco Villa Borghese', placeName: 'Parco Villa Borghese',
                  url: 'https://www.yelp.com/biz/parco-villa-borghese-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'NIGHTACTIVITY', description: 'Club', placeName: 'iQ Hotel Roma', description: 'iQ Hotel Roma',
                  url: 'https://www.yelp.com/biz/iq-hotel-roma-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA',
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id }),
    TripEvent.create({ purpose: 'MORNINGACTIVITY', description: 'Parco Villa Borghese', placeName: 'Parco Villa Borghese',
                  url: 'https://www.yelp.com/biz/parco-villa-borghese-roma?adjust_creative=rBDW7UJLMOHvUmVZrxCdEA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=rBDW7UJLMOHvUmVZrxCdEA', 
                  startDate: '2021-12-22', endDate: '2021-12-22', 
                  status: 'PROPOSED', tripId: trips[2].id })
  ])

  console.log(`seeded ${events.length} trip events`)

  // create event attendees
  const eventAttendees = await Promise.all([
    EventAttendee.create({ tripeventId: events[0].id, userId: users[3].id }),
    EventAttendee.create({ tripeventId: events[0].id, userId: users[4].id }),
  ])

  console.log(`seeded ${eventAttendees.length} event attendees`)

  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed