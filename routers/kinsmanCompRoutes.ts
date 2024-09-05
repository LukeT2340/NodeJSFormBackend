import express, { Response, Request } from "express"
import rateLimit from "express-rate-limit"
const router = express.Router()
const bodyParser = require("body-parser")
const Submission = require("../models/KinsmanComp.ts")
const { isValidState } = require("../utils/miscellaneous")

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

  if (!isValidState(state)) {
    return res.status(400).json({
      message:
        'State was not provided or was provided in the incorrect format. Must be one of "NSW", "NT", "QLD", "ACT", "WA", "VIC", "TAS", "SA" case-sensitive.',
    })
  }

  // You could do similar validation checks for other user inputs here

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

    // mongoose returns an error code of 11000 when there are unique field violations, i.e. email in this case
    if (errorCode === 11000) {
      // Gets name of field that violates unique requirement (will be mobile in this case)
      const duplicateField = Object.keys(error.keyPattern)[0]
      return res.status(422).json({ duplicateField })
    }
    return res.status(400).json({ message: "Unknown error submitting" })
  }
})

module.exports = router
