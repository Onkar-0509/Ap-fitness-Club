import Member from "../Model/Member.js";
import User from "../Model/User.js"
import bcrypt from "bcrypt";
import Notification from "../Model/Notification.js"
import cron from 'node-cron';

export const memberinfo = async (req, res) => {
  try {
    const { name, phoneNumber, startDate, endDate, totalPayment, deposit } = req.body;

    const membersinfo = new Member({
      name,
      phoneNumber,
      startDate,
      endDate,
      totalPayment,
      deposit,
    });

    await membersinfo.save();

    res.status(201).json({
      message: "GYM Member Saved successfully",
      success: true,
      membersinfo: membersinfo,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error occurred",
      success: false,
      error: err.message,
    });
  }
};

export const info = async (req, res) => {
  try {
    const memberdata = await Member.find();
    res.status(200).json({
      message: "Member data fetched successfully",
      success: true, 
      data: memberdata,
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error fetching member data",
      success: false,
      error: err.message,
    });
  }
};

export const deleteMember =async(req,res)=>{
  try{
    const memberId =req.params.id;
    console.log(memberId)

    const memberdelete =await Member.findByIdAndDelete(memberId);
    
    if(!memberdelete){
      return res.status(404).json({
        message:"Member not found",
        success:false
      })
    }

    const membersinfo=await Member.find();

    res.status(200).json({
      message:"Member deleted successfully ",
      success:true,
      data:membersinfo
    })
    
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({
      message:"Internal server error occured",
      success:false,
      error:err.message,
    })

  }
}

export const updateMember=async(req,res)=>{
  try{

     const memberId =req.params.id;
     const Updatedata =req.body;

     const updatedMember =await Member.findByIdAndUpdate(memberId,Updatedata,{new:true , runValidators: true,});
     
     if(!updatedMember){
      return res.status(404).json({
        messsage:"Member not found ",
        success:false,
      })
     }

     res.status(200).json({
      message:"Member update successfully",
      success:true,
      updatedMember
     })
  }
  catch(err){
    res.status(500).json({
      message:"internal server error occured",
      success:false,
      error:err.message,
    })
  }
}

export const Profile = async (req, res) => {
  try {
    const { password, phoneNumber } = req.body;

    if (!password || !phoneNumber) {
      return res.status(400).json({
        message: 'Password and Phone Number are required',
        success: false,
      });
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber }, 
      { password: hashedPassword }, 
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'User updated successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error Occurred',
      success: false,
      error: err.message,
    });
  }
};



export const checkMembershipExpiration = async (req, res) => {
  try {
    const MemberInfo = await Member.find();
    const dateNow = new Date();

    // Get the start of today to compare only the date part
    const startOfDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());

    for (let member of MemberInfo) {
      const endDate = new Date(member.endDate);
      
      // Compare only the date part of the endDate
      const memberEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

      // Check if membership ends today (ignoring time)
      if (memberEndDate.getTime() === startOfDay.getTime()) {
        const message = `${member.name} has GYM Membership Finished`;

        const NotificationInfo = new Notification({
          name: member.name,
          message,
        });

        // Save the notification
        await NotificationInfo.save();
      }
    }

    // Fetch all notifications from the database
    const notifications = await Notification.find();

    if (notifications.length === 0) {
      return res.status(404).json({
        message: "Notifications not found",
        success: false,
      });
    }

    // Return the fetched notifications
    res.status(200).json({
      message: "Notifications fetched successfully",
      success: true,
      notifications,
    });

  } catch (err) {
    console.error("Error while checking membership expiration:", err.message);
    res.status(500).json({
      message: "Error while checking membership expiration",
      success: false,
      Error: err.message,
    });
  }
};

// Schedule this function to run every day at midnight
cron.schedule('0 0 * * *', checkMembershipExpiration);



export const deleteNotifications = async (req, res) => {
  try {
    const  id  = req.params.id; 

    const deleteNotification = await Notification.findByIdAndDelete(id);

    if (!deleteNotification) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }

    const notificationinfo = await Notification.find();

    res.status(200).json({
      message: "Notification deleted successfully",
      success: true,
      notificationinfo, 
    });
    
  } catch (err) {
    res.status(500).json({
      message: "Internal error occurred",
      success: false,
    });
  }
};
