const express = require("express")
const router = require('./src/routes/routes')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`App Listening on port: ${port}`)
})