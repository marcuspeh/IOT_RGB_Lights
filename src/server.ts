import app from './app'
import databaseConnection from './services/dbConnection'

const PORT:number = Number(process.env.PORT) || 3000

// Connect to db
databaseConnection
    .then(() => {
        app.listen(PORT)
        console.log(`Listening on port ${PORT}...`)
    })
    .catch(console.error)