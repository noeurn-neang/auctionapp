import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Countdown = ({date}) => {
    const [text, setText] = useState("");
    const [isClosed, setClosed] = useState(false);
    useEffect(() => {
        const pad = (str, max) => {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str; 
        }

        const format = duration => {
            var days = duration.days(),
            hrs = duration.hours(),
            mins = duration.minutes(),
            secs = duration.seconds();

            return days + ' days ' + pad(hrs, 2) + ':' + pad(mins, 2) + ':' + pad(secs, 2);
        }

        let interval = setInterval(() => {
            const current = moment();
            const closeDate = moment(date);

            if(closeDate <= current) {
                clearInterval(interval);
                setClosed(true);
                return false;
            }
            const diff = closeDate.diff(current);
            
            setText(format(moment.duration(diff)));
        }, 1000)

        return interval;
    }, [date]);
    return <h3 className="mt-1 mb-3">{isClosed ? "Closed" : `Time remaining: ${text}`}</h3>
}

export default Countdown;