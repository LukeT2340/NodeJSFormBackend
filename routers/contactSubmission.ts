import express, { Response, Request } from 'express'
const router = express.Router()
const bodyParser = require('body-parser')
const Contact = require('../models/Contact.ts')

router.use(bodyParser.json())

router.post('/submit', async (req: Request, res: Response) => {
    const name:string = req.body.name
    const email:string = req.body.email
    const postcode:string= req.body.postcode
    
    const formattedName = name.trim()
    const formattedEmail = email.trim().toLowerCase()
    const formattedPostcode = postcode.trim()

    if (formattedName.length === 0) {
        return res.status(400).json({ message: "Name is empty" })
    }

    if (formattedEmail.length === 0) {
        return res.status(400).json({ message: "Email is empty" })
    }

    if (formattedPostcode.length === 0) {
        return res.status(400).json({ message: "Postcode is empty" })
    }

    try {
        const newContact = new Contact({
            name: formattedName,
            email: formattedEmail,
            postcode: formattedPostcode
        })

        await newContact.save()

        return res.status(200).json({ message: "Form submitted successfully" })
    } catch (error: any) {
        const errorCode: number = error.code
        if (errorCode === 11000) {
            console.warn(`Duplicate email entered: ${formattedEmail}`)
            return res.status(400).json({ message: "Duplicate email" })
        }

        return res.status(400).json({ message: "Error adding submission" })
    }
})

module.exports = router