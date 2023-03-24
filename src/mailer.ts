import 'dotenv/config';
import nodemailer from 'nodemailer';

const hostname = process.env.SMTP_HOST;
const username = process.env.SMTP_USERNAME;
const password = process.env.SMTP_PASSWORD;
const port = +process.env.SMTP_PORT!;
const sender = process.env.SMTP_SENDER;

const transporter = nodemailer.createTransport({
  host: hostname,
  port: port,
  secure: false,
  requireTLS: true,
  auth: {
    user: username,
    pass: password,
  },
  // logger: true,
});

const ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ical.marudot.com//iCal Event Maker
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Europe/Berlin
LAST-MODIFIED:20201011T015911Z
TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin
X-LIC-LOCATION:Europe/Berlin
BEGIN:DAYLIGHT
TZNAME:CEST
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:CET
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:20230324T151507Z
UID:1679670873588-88344@ical.marudot.com
DTSTART;TZID=Europe/Berlin:20230331T120000
DTEND;TZID=Europe/Berlin:20230331T182000
SUMMARY:Test Event as ics file
DESCRIPTION:test description
LOCATION:Fotografiska\, Stadsgårdshamnen 22\, 116 45 Stockholm
END:VEVENT
END:VCALENDAR
`;

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
				<p>see the details below...</p>
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
