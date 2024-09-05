import express, { Response, Request } from "express"
import rateLimit from "express-rate-limit"
const router = express.Router()
const bodyParser = require("body-parser")
const Submission = require("../models/KinsmanComp.ts")

router.use(bodyParser.json())

router.use(rateLimit)

// Submit submission to kinsman competition
router.post("/submit", async (req: Request, res: Response) => {
  const partyDescription: string = req.body.partyDescription
  const firstName: string = req.body.firstName
  const lastName: string = req.body.lastName
  const email: string = req.body.email
  const postcode: string = req.body.postcode
  const mobile: string = req.body.mobile
  const state: string = req.body.state

  try {
    const newSubmission = new Submission({
      firstName,
      lastName,
      email,
      mobile,
      postcode,
      partyDescription,
      state,
    })

    await newSubmission.save()
    return res.status(200).json({ message: "Form submitted successfully" })
  } catch (error: any) {
    const errorCode: number = error.code

    // 11000 refers to unique field violation, i.e. email or mobile
    if (errorCode === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0] // Gets name of field that violates unique requirement (email or mobile)
      return res.status(422).json({ duplicateField })
    }
    return res.status(400).json({ message: "Unknown error submitting" })
  }
})

module.exports = router
