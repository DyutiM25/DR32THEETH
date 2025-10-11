import Appointment from '../models/Appointment.js';
import User from '../models/User.js';

export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

        if(!doctorId || !appointmentDate || !appointmentTime || !reason) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const doctor = await User.findById(doctorId);

        if(!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            appointmentDate: new Date(appointmentDate),
            appointmentTime
        });
        
        if(existingAppointment) {
            return res.status(400).json({ message: "The selected time slot is already booked. Please choose a different time." });
        }

        const newAppointment = await Appointment.create({
            patient: req.user._id,
            doctor: doctorId,
            appointmentDate: new Date(appointmentDate),
            appointmentTime,
            reason
        });

        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });  
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Error booking appointment" });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const query = 
            req.user.role === 'doctor'
            ? { doctor: req.user._id }
            : { patient: req.user._id };

        const appointments = await Appointment.find(query)
            .populate('patient', 'firstName lastName email phone')
            .populate('doctor', 'firstName lastName email phone specialization')
            .sort({ appointmentDate: 1, appointmentTime: 1 });

        res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Error fetching appointments" });
    }
}

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // expected values: confirmed, cancelled, completed

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only the assigned doctor can modify the status
    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: `Appointment status updated to ${status}`,
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Error updating appointment" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only the patient can cancel the appointment
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Error cancelling appointment" });
  }
};
