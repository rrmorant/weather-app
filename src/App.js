import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons/faFrown";
import "./App.css";

function GfGWeatherApp() {
	const [input, setInput] = useState("");
	const [weather, setWeather] = useState({
		loading: false,
		data: {},
		error: false,
	});

	const toDataFunction = () => {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const WeekDays = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
			months[currentDate.getMonth()]
		}`;
		return date;
	};

	const search = async (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setInput("");
			setWeather({ ...weather, loading: true });
			const url = "https://api.openweathermap.org/data/2.5/weather";
			const api_key = "f00c38e0279b7bc85480c3fe775d518c";
			await axios
				.get(url, {
					params: {
						q: input,
						units: "metric",
						appid: api_key,
					},
				})
				.then((res) => {
					console.log("res", res);
					setWeather({ data: res.data, loading: false, error: false });
				})
				.catch((error) => {
					setWeather({ ...weather, data: {}, error: true });
					setInput("");
					console.log("error", error);
				});
		}
	};
}

export default GfGWeatherApp;
