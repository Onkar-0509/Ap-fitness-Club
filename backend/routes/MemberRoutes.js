import express from "express";
import { memberinfo, info ,deleteMember,updateMember, Profile, checkMembershipExpiration, deleteNotifications } from "../controller/memberController.js";

const router=express.Router();

router.post("/memberinfo",memberinfo);
router.get('/info',info);
router.delete('/memberinfo/:id',deleteMember);
router.put('/updateMember/:id',updateMember);
router.post('/profile',Profile);
router.get('/notifications',checkMembershipExpiration);
router.delete('/deletenotification/:id',deleteNotifications);


export default router;