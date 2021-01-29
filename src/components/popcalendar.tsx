import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import DateRangeSelector from './daterangeselector';
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import TextField from "@material-ui/core/TextField";
import "../style/filter.css";


export default function PopoverCalender() {
  const [dateRange, setDateRange] = React.useState<DateRange>({});
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [dateRangeSelected, setDateRangeSelected] = React.useState("");

  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

 React.useEffect(() => {
      console.log("daterange",dateRange);
      if (dateRange.startDate === undefined || dateRange.endDate === undefined) {
          setDateRangeSelected("");
      }
      else {
          const startMonth = dateRange.startDate?.getMonth()+1;
          const endMonth = dateRange.endDate?.getMonth()+1;
          const string = dateRange.startDate?.getDate()+"/"+startMonth+"/"+dateRange.startDate?.getFullYear()
          +' - '+dateRange.endDate?.getDate()+'/'+endMonth+'/'+dateRange.endDate?.getFullYear();
          setDateRangeSelected(string);
      }
  }, [dateRange]);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <TextField
          id="outlined-multiline-static"
          label="Fechas"
          variant="outlined"
          size={"small"}
          value={dateRangeSelected}
          InputProps={{endAdornment: <CalendarTodayOutlinedIcon onClick={handleClick}/>}}
      />
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
      >
        <div>
            <DateRangeSelector setDateRange={setDateRange}/>
        </div>
      </Popover>
    </div>
  );
}
