import { createEvent, EventAttributes } from 'ics';

export const createIcs = (event: EventAttributes) => {
  let result = '';
  createEvent(event, (err, value) => {
    if (err) {
      console.log(err);
      return;
    }

    result = value;
  });
  return result;
};
