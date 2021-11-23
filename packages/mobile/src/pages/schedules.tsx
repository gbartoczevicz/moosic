import React, { useEffect, useState } from "react";
import Calendar from "@react-native-community/datetimepicker";

import * as Lib from "@/lib";

const Schedules: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [togglePicker, setTogglePicker] = useState(false);

  const handleDateChange = (_event: unknown, date?: Date) => {
    if (date) {
      setCurrentDate(date);
    }
  };

  useEffect(() => {
    (() => setTogglePicker(false));
  }, []);

  return (
    <Lib.Container>
      <Lib.Text>
        The current date selected is {currentDate.toISOString()}
      </Lib.Text>
      <Lib.Button onPress={() => setTogglePicker(!togglePicker)} variant="dark">
        Book a new date
      </Lib.Button>
      {togglePicker && (
        <Calendar
          mode="date"
          display="calendar"
          value={currentDate}
          onChange={handleDateChange}
        />
      )}
    </Lib.Container>
  );
};

export default Schedules;
