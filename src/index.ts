import express, { Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import { createIcs } from './ics';
import { event, sendNewEmail } from './mailer';

const app = express();

app.get(
  '/email',
  query('email').isEmail(),
  async (req: Request, res: Response) => {
    const { email } = req.query;
    const errors = validationResult(req);
    if (!email) {
      return res.status(400).json({ message: 'provide an email' });
    }
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await sendNewEmail(email.toString());

    res.json({ message: `email sent to '${email}'` });
  }
);

app.get('/', async (req: Request, res: Response) => {
  const v = createIcs(event);
  console.log(v);
  res.json({ message: `test` });
});

app.listen(3030, () => console.log('app listening on port 3030'));
