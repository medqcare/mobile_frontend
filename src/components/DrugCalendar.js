import React, { useState } from "react";
import {
	TouchableOpacity,
	View,
	Text,
	FlatList,
	StyleSheet,
} from "react-native";

const MONTHS = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember",
];

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function Calendar({
	selectedDate = new Date(),
	onDateSelected,
}) {
	const [date, setDate] = useState(new Date());
	const [month, setMonth] = useState(date.getMonth());
	const [localSelectedDate, setLocalSelectedDate] = useState(selectedDate);

	Date.isLeapYear = function (year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	};

	Date.getDaysInMonth = function (year, month) {
		return [
		31,
		Date.isLeapYear(year) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
		][month];
	};

	Date.prototype.isLeapYear = function () {
		return Date.isLeapYear(this.getFullYear());
	};

	Date.prototype.getDaysInMonth = function () {
		return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
	};

	Date.prototype.addMonths = function () {
		var n = this.getDate();
		this.setDate(1);
		this.setMonth(this.getMonth() + 1);
		this.setDate(Math.min(n, this.getDaysInMonth()));
		return this;
	};

	Date.prototype.minusMonths = function () {
		var n = this.getDate();
		this.setDate(1);
		this.setMonth(this.getMonth() - 1);
		this.setDate(Math.min(n, this.getDaysInMonth()));
		return this;
	};

	const getEarlierDates = () => {
		const isThisMonth = month === new Date().getMonth();

		const daysInCurrentMonth = date.getDate()
		const daysInNextMonths = date.getDaysInMonth()
		const days = isThisMonth ? daysInCurrentMonth : daysInNextMonths;

		const resultInCurrentMonth = Array.from(Array(days).keys())
		const resultInPreviousMonths = Array.from(Array(days).keys()).reverse()
		const result = isThisMonth ? resultInCurrentMonth : resultInPreviousMonths

		return result
	};

	const calculatePreviousDate = (key) => {
		const isThisMonth = month === new Date().getMonth();
		const result = isThisMonth ? date.getDate() - key : key + 1;
		return result;
	};


	const getDayName = (dayNumber) => {
		return DAYS[dayNumber];
	};

	const getPreviousDayNumber = (dateNumber) => {
		const stringDate = `${month + 1}/${dateNumber}/${date.getFullYear()}`;
		const dayNumber = new Date(stringDate).getDay();
		return dayNumber;
	};

	const onPressHandler = (dateNumberSelected) => {
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const stringDate = `${month}/${dateNumberSelected}/${year}`;
		const newDate = new Date(stringDate);
		setLocalSelectedDate(newDate);
		if (typeof onDateSelected === "function") {
		onDateSelected(newDate);
		}
	};

	const isSelectedDate = (objectDate) => {
		const dateNumber = localSelectedDate.getDate();
		const monthNumber = localSelectedDate.getMonth();
		return (
		dateNumber === objectDate.getDate() &&
		monthNumber === objectDate.getMonth()
		);
	};

	const changeMonth = (direction) => {
		if(direction === 'previous') setDate(date.minusMonths());
		else setDate(date.addMonths());

		setMonth(date.getMonth())
	}

  	const renderDates = ({ item }) => {
		const dateNumber = calculatePreviousDate(item);
		const dayNumber = getPreviousDayNumber(dateNumber);
		const dayName = getDayName(dayNumber);
		const stringDate = `${month + 1}/${dateNumber}/${date.getFullYear()}`;
		const objectDate = new Date(stringDate);
		
		return (
			<TouchableOpacity
				style={isSelectedDate(objectDate) ? styles.selectedDateContainer : styles.unSelectedDateContainer}
				onPress={() => onPressHandler(dateNumber)}
			>
				<View style={styles.innerDateContainer}>
					<Text style={styles.whiteText}> {dayName} </Text>
					<Text style={styles.whiteText}> {dateNumber} </Text>
				</View>
			</TouchableOpacity>
		);
	};

  	return (
		<View style={styles.container}>
			{/* Choose Months */}
			<View style={styles.innerContainer}>
				<TouchableOpacity
					style={styles.arrowTouchable}
					onPress={() => changeMonth('previous')}
				>
            		<Text style={styles.whiteText}>{"<"}</Text>
          		</TouchableOpacity>

				<Text style={styles.monthText}>{MONTHS[month]}</Text>

				{date.getMonth() !== new Date().getMonth() ? (
					<TouchableOpacity
						style={styles.arrowTouchable}
						onPress={() => changeMonth('next')}
					>
						<Text style={styles.whiteText}>{">"}</Text>
					</TouchableOpacity>
				) : null}
      		</View>

			{/* Choose Date */}
			<FlatList
				horizontal={true}
				data={getEarlierDates()}
				renderItem={renderDates}
				keyExtractor={(item) => `${item}`}
				showsHorizontalScrollIndicator={false}
				inverted={true}
			/>
    	</View>
  	);
}

const styles = StyleSheet.create({
	container: { 
		height: 120, 
		paddingVertical: 10 
	},

	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
		marginBottom: 16,
	},

	arrowTouchable: {
		width: 20,
		height: 20,
		alignItems: "center",
	},

	monthText: {
		width: "30%",
		textAlign: "center",
		height: 20,
		color: "#DDDDDD",
	},

	selectedDateContainer: {
		borderRadius: 12,
		backgroundColor: "#005EA2",
		marginRight: 8,
		alignItems: "center",
		paddingVertical: 10,
		width: 46,
		height: 66,
	},

	unSelectedDateContainer: {
		borderRadius: 12,
		backgroundColor: "#3F3F3F",
		marginRight: 8,
		alignItems: "center",
		paddingVertical: 10,
		width: 46,
		height: 66,
	},

	innerDateContainer: {
		justifyContent: "space-between",
		height: "100%",
		alignItems: "center",
	},

	whiteText: {
		color: "#DDDDDD"
	}

})
