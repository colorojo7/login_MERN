import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/api/dashboard", passport.authenticate("jwt", {session:false}), (req,res)=>{
    const user = req.cookies.access_token
    res.send(`logeado ${user}`)
})

export default router