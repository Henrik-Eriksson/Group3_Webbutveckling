import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import   "./calender.css"; 



export default function Calendar() {
  return (
    <div className='container'>
        <div className='event-container'>
            <h1>events</h1>
            <h1>Search butto</h1>
            
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar']}>
            <DateCalendar
            referenceDate={dayjs('2022-04-17')}
            views={['year', 'month', 'day']}
            />
        </DemoContainer>
        </LocalizationProvider>
    </div>
  );
}
