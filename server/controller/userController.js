const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const Doctor = require("../model/doctorModel");
const { log } = require("console");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, confirm_password } = req.body;
    if (!name || !email || !password || !phone || !confirm_password) {
      return res.status(400).json({ message: "All Feilds Are Required!" });
    }

    if (confirm_password != password) {
      return res.status(400).json({ message: "Confirm Password Not Matched!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User Already Exist With Ehis Email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ newUser });
  } catch (error) {}
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Feilds Are Required!" });
    }

    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    user.password = "";

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ user, token });
  } catch (error) {}
};

module.exports.auth = async (req, res) => {
  try {
    const { userId } = req.body;
    var user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(401).json({ message: "Authentication Failed!" });
    }
    user.password = "";
    res.status(200).json({ user });
  } catch (error) {}
};

module.exports.applyDoctor = async (req, res) => {
  try {
    const {
      experience,
      firstName,
      lastName,
      address,
      lastWorked,
      email,
      feePerConsultation,
      fromTime,
      toTime,
      qualification,
      specialization,
      phone,
      userId,
    } = req.body;

    const doctorApplicationCheck = await Doctor.findOne({ email });

    // console.log(doctorApplicationCheck);

    if (doctorApplicationCheck) {
      res.status(400).json({ message: "Application Already exist!" });
    } else {
      const newDoctor = new Doctor({
        userId,
        experience,
        firstName,
        lastName,
        address,
        lastWorked,
        email,
        feePerConsultation,
        fromTime,
        toTime,
        qualification,
        specialization,
        phone,
      });

      const admin = await User.findOne({ isAdmin: true });
      const adminId = admin._id.toString();
      // console.log(adminId);
      const updateAdmin = await User.findByIdAndUpdate(
        { _id: adminId },
        { $push: { unseenNotifications: newDoctor._id } }
      );

      // console.log(updateAdmin);

      await newDoctor.save();
      res.status(200).json({ newDoctor });
    }
  } catch (error) {}
};

module.exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ doctorStatus: true });
    // console.log(doctors);
    res.status(200).json({ doctors });
  } catch (error) {}
};

module.exports.getDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({ _id: id });
    // console.log(doctors);
    res.status(200).json({ doctor });
  } catch (error) {}
};

module.exports.bookAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      { _id: id },
      { $push: { appointments: userId } }
    );
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { appointments: id } }
    );
    await doctor.save();
    await user.save();
    res.status(200).json({ doctor });
  } catch (error) {}
};

module.exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      { _id: id },
      { $pull: { appointments: userId } }
    );
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { appointments: id } }
    );
    await doctor.save();
    await user.save();
    res.status(200).json({ doctor });
  } catch (error) {}
};

module.exports.getAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    const appointments = user.appointments;
    var bookedAppointment;
    var userBookedAppointments = [];
    for (let i = 0; i < appointments.length; i++) {
      bookedAppointment = await Doctor.findById({ _id: appointments[i] });
      userBookedAppointments.push(bookedAppointment);
    }
    res.status(200).json({ userBookedAppointments });
  } catch (error) {}
};

module.exports.getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById({ _id: userId });
    res.status(200).json({ user });
  } catch (error) {}
};
