import express from "express";
import { memberinfo, info ,deleteMember,updateMember, Profile, checkMembershipExpiration, deleteNotifications } from "../controller/memberController.js";
import ensureAutheticate from "../Middleware/authMiddleware.js";

const router=express.Router();

router.post("/memberinfo",ensureAutheticate,memberinfo);
router.get('/info',ensureAutheticate,info);
router.delete('/memberinfo/:id',ensureAutheticate,deleteMember);
router.put('/updateMember/:id',ensureAutheticate,updateMember);
router.post('/profile',ensureAutheticate,Profile);
router.get('/notifications',ensureAutheticate,checkMembershipExpiration);
router.delete('/deletenotification/:id',ensureAutheticate,deleteNotifications);


export default router;
