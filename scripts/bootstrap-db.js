/* idempotent operation to bootstrap database */
const faunadb = require('faunadb')
const chalk = require('chalk')
require('dotenv').config()
const q = faunadb.query

/*  */
function setupFaunaDB() {
  console.log(chalk.yellow('Attempting to create the DB schemas...'))

  const key = checkForFaunaKey()

  const client = new faunadb.Client({
    secret: key,
  })

  /* Based on your requirements, change the schema here */
  return client
    .query(
      q.CreateCollection({
        name: 'users',
      })
    )
    .then(() =>
      client.query(
        q.Do(
          q.CreateCollection({
            name: 'posts',
            permissions: {
              create: q.Collection('users'),
            },
          }),
          q.CreateCollection({
            name: 'journals',
            permissions: {
              create: q.Collection('users'),
            },
          })
        )
      )
    )
    .then(() =>
      client.query(
        q.Do(
          q.CreateIndex({
            name: 'users_by_id',
            source: q.Collection('users'),
            terms: [
              {
                field: ['data', 'id'],
              },
            ],
            unique: true,
          }),
          q.CreateIndex({
            // this index is optional but useful in development for browsing users
            name: `all_users`,
            source: q.Collection('users'),
          }),
          q.CreateIndex({
            name: 'all_posts',
            source: q.Collection('posts'),
            permissions: {
              read: q.Collection('users'),
            },
          }),
          q.CreateIndex({
            name: 'all_journals',
            source: q.Collection('journals'),
            permissions: {
              read: q.Collection('users'),
            },
          }),
          q.CreateIndex({
            name: 'posts_by_journal',
            source: q.Collection('posts'),
            terms: [
              {
                field: ['data', 'journal'],
              },
            ],
            permissions: {
              read: q.Collection('users'),
            },
          })
        )
      )
    )
    .catch((e) => {
      if (e.message === 'instance already exists') {
        console.log('Schemas are already created... skipping')
        process.exit(0)
      } else {
        console.error('There was a problem bootstrapping the db', e)
        throw e
      }
    })
}

function checkForFaunaKey() {
  if (!process.env.FAUNA_SECRET_KEY) {
    console.log(
      chalk.bold.red(
        "Required 'FAUNA_SECRET_KEY' environment variable not found."
      )
    )
    console.log(
      chalk.yellow.bold(`
    ~~~~~~~~~~~~~~~~~~~~~~~~~
    You can create a your fauna db server secret by following this:
      - https://docs.fauna.com/fauna/current/tutorials/authentication/user.html#setup-server-key
    
    Then ensure you have added the server secret into your Netlify site as an environment variable 
    with the key 'FAUNA_SECRET_KEY'.
    ~~~~~~~~~~~~~~~~~~~~~~~~~~
      `)
    )
    process.exit(1)
  }

  console.log(
    chalk.green(`Found FAUNA_SECRET_KEY environment variable in Netlify site`)
  )
  return process.env.FAUNA_SECRET_KEY
}

setupFaunaDB()
  .then(() => {
    console.log(chalk.green(`Bootstraping DB scheamas was successful!`))
  })
  .catch((err) => {
    console.log(
      chalk.red.bold(
        `There was an issue bootstrapping the DB scheamas due to: ${err}`
      )
    )
    process.exit(1)
  })
