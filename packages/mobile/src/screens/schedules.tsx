import React, { useCallback, useEffect, useState } from "react";
import Calendar from "@react-native-community/datetimepicker";

import * as Lib from "@/lib";

export const Schedules: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [togglePicker, setTogglePicker] = useState(false);

  const handleDateChange = (_event: unknown, date?: Date) => {
    if (date) {
      setCurrentDate(date);
    }
  };

  const formatDate = useCallback(
    () =>
      new Intl.DateTimeFormat("pt-BR").format(
        currentDate,
      ),
    [currentDate],
  );

  useEffect(() => {
    (() => setTogglePicker(false));
  }, []);

  return (
    <Lib.Container>
      <Lib.Text>
        The current date selected is {formatDate()}
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
