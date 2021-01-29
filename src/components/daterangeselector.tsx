
import { DateRangePicker } from "@matharumanpreet00/react-daterange-picker";


export default function DateRangeSelector(props: any) {
	const { setDateRange } = props;
	return (
		<DateRangePicker
			open={true}
			onChange={range => setDateRange(range)}
		/>
	);
}

