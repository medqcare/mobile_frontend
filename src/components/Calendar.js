import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
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

  const getRemainingDates = () => {
    const isThisMonth = month === new Date().getMonth();
    const days = isThisMonth
      ? date.getDaysInMonth() - date.getDate() + 1
      : date.getDaysInMonth();
    return Array.from(Array(days).keys());
  };

  const calculateDate = (key) => {
    const isThisMonth = month === new Date().getMonth();
    const result = isThisMonth ? date.getDate() + key : key + 1;
    return result;
  };

  const getDayName = (dateNumber) => {
    const stringDate = `${month + 1}/${dateNumber}/${date.getFullYear()}`;
    const dayNumber = new Date(stringDate).getDay();
    return DAYS[dayNumber];
  };

  const onPressHandler = (dateNumberSelected) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const stringDate = `${month}/${dateNumberSelected}/${year}`;
    const newDate = new Date(stringDate);
    onDateSelected(newDate);
  };

  const isSelectedDate = (objectDate) => {
    const dateNumber = selectedDate.getDate();
    const monthNumber = selectedDate.getMonth();
    return (
      dateNumber === objectDate.getDate() &&
      monthNumber === objectDate.getMonth()
    );
  };

  const renderDates = ({ item }) => {
    const dateNumber = calculateDate(item);
    const dayName = getDayName(dateNumber);
    const stringDate = `${month + 1}/${dateNumber}/${date.getFullYear()}`;
    const objectDate = new Date(stringDate);
    return (
      <TouchableOpacity
        style={{
          borderRadius: 12,
          backgroundColor: isSelectedDate(objectDate) ? "#005EA2" : "#3F3F3F",
          marginRight: 8,
          alignItems: "center",
          paddingVertical: 10,
          width: 46,
          height: 66,
        }}
        onPress={() => onPressHandler(dateNumber)}
      >
        <View
          style={{
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{dayName}</Text>
          <Text style={{ color: "white" }}>{dateNumber}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ backgroundColor: "red", height: 120, paddingVertical: 10 }}>
      {/* Choose Months */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        {date.getMonth() !== new Date().getMonth() ? (
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
              alignItems: "center",
            }}
            onPress={() => {
              setDate(date.minusMonths());
              setMonth(date.getMonth());
            }}
          >
            <Text>{"<"}</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={{ width: "30%", textAlign: "center", height: 20 }}>
          {MONTHS[month]}
        </Text>
        <TouchableOpacity
          style={{
            width: 20,
            height: 20,
            alignItems: "center",
          }}
          onPress={() => {
            setDate(date.addMonths());
            setMonth(date.getMonth());
          }}
        >
          <Text>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Choose Date */}
      <FlatList
        horizontal={true}
        data={getRemainingDates()}
        renderItem={renderDates}
        keyExtractor={(item) => `${item}`}
      ></FlatList>
    </View>
  );
}
