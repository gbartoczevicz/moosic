import React, { useState } from "react";
import Calendar from "@react-native-community/datetimepicker";

import { Container } from "@/lib/container";

const Schedules: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (_event: unknown, date?: Date) => {
    console.info("The new date is", date);

    if (date) {
      setCurrentDate(date);
    }
  };

  return (
    <Container>
      <Calendar
        mode="date"
        display="calendar"
        value={currentDate}
        onChange={handleDateChange}
      />
    </Container>
  );
};

export default Schedules;
