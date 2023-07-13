import 'dotenv/config';
import { EventAttributes } from 'ics';
import nodemailer, { Transporter } from 'nodemailer';
import { createIcs } from './ics';

const sender = process.env.SMTP_FROM;

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_SECRET,
  },
});

export const event: EventAttributes = {
  start: [2023, 3, 29, 7, 30],
  duration: { hours: 4, minutes: 30 },
  title: 'Office Booking',
  description: 'Your booking at Epicenter Stockholm',
  location: 'Mäster Samuelsgatan 36, 111 57 Stockholm',
  url: 'https://weareepicenter.com/stockholm/',
  geo: { lat: 59.33694998989967, lon: 18.066686742188832 },
  categories: ['booking', 'coworking space stockholm', 'Epicenter'],
  status: 'CONFIRMED',
  busyStatus: 'BUSY',
  organizer: { name: 'Admin', email: 'admin@gmail123.com' },
  attendees: [
    {
      name: 'John Snow',
      email: 'johnsnow@snow.com',
      rsvp: true,
      partstat: 'ACCEPTED',
      role: 'REQ-PARTICIPANT',
    },
    {
      name: 'Brittany Seaton',
      email: 'bs@somecoolcompany.com',
      role: 'OPT-PARTICIPANT',
    },
    {
      name: 'GT',
      email: 'gt@icloud22.com',
      role: 'OPT-PARTICIPANT',
    },
  ],
};

const ics: string = createIcs(event);

export const sendNewEmail = async (sendTo: string) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: sendTo,
      subject: 'You have a new booking',
      text: '',
      html: `
				<h3>
					Hi, your booking is confirmed!!
				</h3>
				<p>This is just a test to see how the attached calendar event looks like in different email clients.</p>
			`,
      // icalEvent: {
      //   // filename: 'invitation.ics',
      //   method: 'request',
      //   content: ics,
      // },
      attachments: [
        {
          filename: 'booking.ics',
          content: ics,
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
};
