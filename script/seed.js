const { db, models: { User, Trip, TripAttendee, TripEvent, EventAttendee } } = require('../server/db')

//  * seed - this function clears the database and populates it with test data.
async function seed() {
  await db.sync({ force: true }) // clears database
  console.log('db synced!')

  // Create users
  const users = await Promise.all([
    User.create({ username: 'cody@fsa.com', name: 'cody', password: '123' }),
    User.create({ username: 'murphy@fsa.com', name: 'murphy', password: '123' }),
    User.create({ username: 'lucy@fsa.com', name: 'lucy', password: '123' }),
    User.create({ username: 'konstantin@fsa.com', name: 'konstantin', password: '123' }),
    User.create({ username: 'ayan@fsa.com', name: 'ayan', password: '123' }),
    User.create({ username: 'john@fsa.com', name: 'john', password: '123' }),
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
              })
  ])

  console.log(`seeded ${trips.length} trips`)

  // create trip attendees
  const tripAttendees = await Promise.all([
    TripAttendee.create({ tripId: trips[0].id, userId: users[3].id, email: 'email1@something.com' }),
    TripAttendee.create({ tripId: trips[0].id, userId: users[4].id, email: 'email2@something.com' }),
  ])

  console.log(`seeded ${tripAttendees.length} trip attendees`)

  // create events
  const events = await Promise.all([
    TripEvent.create({ purpose: 'DINNER', description: 'Final evening get-together!', 
                  startDate: '2021-10-30', endDate: '2021-10-30', 
                  status: 'PROPOSED', tripId: trips[0].id }),
    TripEvent.create({ purpose: 'LUNCH', description: 'Olive Garden', 
                  startDate: '2021-10-30', endDate: '2021-10-30', 
                  status: 'PROPOSED', tripId: trips[0].id }),
    TripEvent.create({ purpose: 'BREAKFAST', description: 'McDonalds for the kids', 
                  startDate: '2021-10-30', endDate: '2021-10-30', 
                  status: 'PROPOSED', tripId: trips[0].id }),
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
