import React, { useState, useEffect } from "react";
import { movies, playing, showtimes, cinemas } from "../utils/mockData.js";

const QuickBooking = () => {
  const [bookingType, setBookingType] = useState("Movie");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedTiming, setSelectedTiming] = useState("");

  const currentlyPlaying = playing.length > 0 ? playing : movies.slice(0, 3);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      const displayDate =
        i === 0
          ? `Today, ${date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`
          : i === 1
          ? `Tomorrow, ${date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`
          : date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });

      dates.push({ value: formattedDate, display: displayDate });
    }
    return dates;
  };

  const dates = generateDates();

  useEffect(() => {
    setSelectedMovie("");
    setSelectedDate("");
    setSelectedCinema("");
    setSelectedTiming("");
  }, [bookingType]);

  const getAvailableShowtimes = () => {
    if (!selectedMovie || !selectedDate) return [];
    const movieObj = currentlyPlaying.find((m) => m.title === selectedMovie);
    if (!movieObj) return [];
    const movieId = movieObj.id;
    const movieShowtimes = showtimes.filter(
      (s) => s.movieId === movieId && s.date === selectedDate.split(",")[0].trim()
    );
    if (movieShowtimes.length === 0) return [];
    return movieShowtimes.flatMap((st) =>
      st.times.map((time) => {
        const [hour, minute] = time.split(":");
        const hourNum = parseInt(hour);
        const ampm = hourNum >= 12 ? "PM" : "AM";
        const hour12 = hourNum % 12 || 12;
        return {
          value: time,
          display: `${hour12}:${minute} ${ampm} (${st.auditorium}) - ₹${st.price.toFixed(2)}`,
          auditorium: st.auditorium,
          price: st.price,
        };
      })
    );
  };

  const availableTimings = getAvailableShowtimes();

  const handleSubmit = (e) => {
    e.preventDefault();
    const movieObj = currentlyPlaying.find((m) => m.title === selectedMovie);
    const timing = availableTimings.find((t) => t.value === selectedTiming);
    const booking = {
      bookingType,
      movie: movieObj,
      date: selectedDate,
      cinema: selectedCinema,
      timing,
      timestamp: new Date().toISOString(),
    };
    console.log("Booking details:", booking);
    alert(`Booking submitted successfully for ${selectedMovie} on ${selectedDate}!`);
  };

  const isDateEnabled = selectedMovie !== "";
  const isCinemaEnabled = selectedDate !== "" && isDateEnabled;
  const isTimingEnabled = selectedCinema !== "" && isCinemaEnabled;
  const isBookEnabled = selectedTiming !== "" && isTimingEnabled;

  const dropdownBase =
    "appearance-none w-full text-xs p-1.5 rounded border transition focus:outline-none";
  const enabledDropdown =
    "bg-white text-black dark:bg-neutral-900 dark:text-white border-gray-800/95 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10";
  const disabledDropdown =
    "bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500 cursor-not-allowed border-gray-400 dark:border-white/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="m-2 flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-white/10 border backdrop-blur-md border-gray-800/95 dark:border-white/20 rounded-xl shadow-sm"
    >
      {/* Title + Toggle */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-black dark:text-white">Quick Book</p>
        <div className="flex gap-1">
          {["Movie", "Cinema"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setBookingType(type)}
              className={`text-xs px-2 py-1 rounded ${
                bookingType === type
                  ? "bg-gray-800/95 text-white dark:bg-white dark:text-black"
                  : "bg-gray-200 text-black dark:bg-neutral-900 dark:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto text-xs">
        {/* Movie/Cinema */}
        <select
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          className={`${dropdownBase} ${enabledDropdown}`}
        >
          <option value="">
            Select {bookingType === "Movie" ? "Movie" : "Cinema"}
          </option>
          {(bookingType === "Movie" ? currentlyPlaying : cinemas).map((item) => (
            <option key={item.id} value={bookingType === "Movie" ? item.title : item.name}>
              {bookingType === "Movie" ? item.title : item.name}
            </option>
          ))}
        </select>

        {/* Date */}
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={!isDateEnabled}
          className={`${dropdownBase} ${isDateEnabled ? enabledDropdown : disabledDropdown}`}
        >
          <option value="">Date</option>
          {dates.map((d, i) => (
            <option key={i} value={d.value}>
              {d.display}
            </option>
          ))}
        </select>

        {/* Cinema/Movie */}
        <select
          value={selectedCinema}
          onChange={(e) => setSelectedCinema(e.target.value)}
          disabled={!isCinemaEnabled}
          className={`${dropdownBase} ${isCinemaEnabled ? enabledDropdown : disabledDropdown}`}
        >
          <option value="">
            {bookingType === "Movie" ? "Cinema" : "Movie"}
          </option>
          {(bookingType === "Movie" ? cinemas : currentlyPlaying).map((item) => (
            <option key={item.id} value={bookingType === "Movie" ? item.name : item.title}>
              {bookingType === "Movie" ? item.name : item.title}
            </option>
          ))}
        </select>

        {/* Timing */}
        <select
          value={selectedTiming}
          onChange={(e) => setSelectedTiming(e.target.value)}
          disabled={!isTimingEnabled}
          className={`${dropdownBase} ${isTimingEnabled ? enabledDropdown : disabledDropdown}`}
        >
          <option value="">Timing</option>
          {availableTimings.map((t, i) => (
            <option key={i} value={t.value}>
              {t.display}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isBookEnabled}
        className={`text-xs px-3 py-1 rounded border ${
          isBookEnabled
            ? "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
            : "bg-gray-300 text-black cursor-not-allowed"
        }`}
      >
        Book
      </button>
    </form>
  );
};

export default QuickBooking;
