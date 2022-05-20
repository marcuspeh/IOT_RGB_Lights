import app from './app'
import { dataSource } from './services/dbConnection'

const PORT:number = Number(process.env.PORT) || 3000

// Connect to db
dataSource.initialize()
    .then(() => {
        app.listen(PORT)
        console.log(`Listening on port ${PORT}...`)
    })
    .catch(console.error)