import express, { Response, Request } from 'express'
const router = express.Router()
const bodyParser = require('body-parser')
const KinsmanComp = require('../models/KinsmanComp.ts')

router.use(bodyParser.json())

router.post('/submit', async (req: Request, res: Response) => {
    const partyDescription: string = req.body.partyDescription
    const firstName:string = req.body.firstName
    const lastName: string = req.body.lastName
    const email:string = req.body.email
    const postcode:string= req.body.postcode
    const mobile: string = req.body.mobile
    const state: string = req.body.state
    try {
        const newSubmission = new KinsmanComp({
            firstName,
            lastName,
            email,
            mobile,
            postcode,
            partyDescription,
            state
        })

        await newSubmission.save()
        return res.status(200).json({ message: "Form submitted successfully" })
    } catch (error: any) {
        const errorCode: number = error.code
        console.log(error)
        // 11000 refers to unique value violation, i.e. email or mobile
        if (errorCode === 11000) {
            const duplicateField = Object.keys(error.keyPattern)[0] // Gets name of field that violates unique requirement
            return res.status(422).json({ duplicateField })
        }
        return res.status(400).json({ message: "Unknown error submitting" })
    }
})

module.exports = router