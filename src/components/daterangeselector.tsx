import React from "react";
import { DateRangePicker, DateRange } from "@matharumanpreet00/react-daterange-picker";

type Props = {}

export default function DateRangeSelector() {
	const [open, setOpen] = React.useState(true);
	const [dateRange, setDateRange] = React.useState<DateRange>({});

	return (
		<DateRangePicker
			open={open}
			onChange={range => setDateRange(range)}
		/>
	);
}

