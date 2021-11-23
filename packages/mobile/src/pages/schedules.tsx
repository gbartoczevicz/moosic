import React, { useState } from "react";
import Calendar from "@react-native-community/datetimepicker";

import * as Lib from "@/lib";

const Schedules: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (_event: unknown, date?: Date) => {
    console.info("The new date is", date);

    if (date) {
      setCurrentDate(date);
    }
  };

  return (
    <Lib.Container>
      <Calendar
        mode="date"
        display="calendar"
        value={currentDate}
        onChange={handleDateChange}
      />
    </Lib.Container>
  );
};

export default Schedules;
