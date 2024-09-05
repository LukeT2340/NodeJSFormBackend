import express, { Response, Request } from "express"
import { rateLimitMiddleware } from "../middleware/rateLimiter"
const router = express.Router()
const Submission = require("../models/KinsmanComp.ts")

router.use(express.json())

router.use(rateLimitMiddleware)

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

    // mongoose will also throw an error if the state is not one of the predefined enums. Handle later

    // mongoose returns an error code of 11000 when there are unique field violations, i.e. email in this case
    if (errorCode === 11000) {
      // Gets name of field that violates unique requirement (will be mobile in this case)
      const duplicateField = Object.keys(error.keyPattern)[0]
      return res.status(422).json({ duplicateField })
    }
    return res.status(400).json({ message: "Error submitting form" })
  }
})

module.exports = router
