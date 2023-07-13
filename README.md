# Send emails with nodemailer (attachments and calendar events)

This is just a demo, how to send emails using NodeJS.

1. configure a SMTP service (I used https://app.sendinblue.com/)
2. clone the repo `git clone https://github.com/tarcea/nodemailer-ts.git`
3. in the root directory of the project, create an `.env` file with credentials from your SMTP (as in `env.example`)
4. run `npm install` and then `npm start`

Make a request like so: `http://localhost:3030/email?email=email@something.com`

Replace `email@something.com` with a real emai address:-)
