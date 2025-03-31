import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useAppForm } from "@/hooks/use-app-form";

import { FormDateField } from "../components/form/date-field";
import { FormDateTimeField } from "../components/form/date-time-field";
import { FormTimeField } from "../components/form/time-field";

export const Route = createFileRoute("/_main/form-time-example")({
  component: FormTimeExample,
});

export function FormTimeExample() {
  const [date, setDate] = useState<Date>(new Date());
  const [dateWithTime, setDateWithTime] = useState<Date>(new Date());
  const [isoString, setIsoString] = useState<string>("");
  const [timestamp, setTimestamp] = useState<number>(Date.now());

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold">Date and Time Fields Example</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Date Field</h3>

          <div>
            <h4 className="mb-2 text-sm font-medium">Basic Date</h4>
            <FormDateField
              value={date}
              onChange={setDate}
              label="Select a date"
            />
            <div className="mt-2 text-sm text-gray-500">
              Selected: {date.toLocaleDateString()}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Date with Time String</h4>
            <FormDateField
              value={dateWithTime}
              onChange={setDateWithTime}
              label="Select a date (with time 14:30)"
              time="14:30"
            />
            <div className="mt-2 text-sm text-gray-500">
              Selected: {dateWithTime.toLocaleString()}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Date as ISO String</h4>
            <FormDateField
              value={isoString}
              onChange={setIsoString}
              label="Date as ISO string"
              as="iso"
              time="09:00"
            />
            <div className="mt-2 text-sm text-gray-500">
              ISO String: {isoString}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Date as Timestamp</h4>
            <FormDateField
              value={timestamp}
              onChange={setTimestamp}
              label="Date as timestamp"
              time="12:00:30"
            />
            <div className="mt-2 text-sm text-gray-500">
              Timestamp: {timestamp}
              <br />
              Date: {new Date(timestamp).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">DateTime Field</h3>

          <div>
            <h4 className="mb-2 text-sm font-medium">Basic DateTime</h4>
            <FormDateTimeField
              value={date}
              onChange={setDate}
              label="Select a date and time"
            />
            <div className="mt-2 text-sm text-gray-500">
              Selected: {date.toLocaleString()}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">
              DateTime with Time Override
            </h4>
            <FormDateTimeField
              value={dateWithTime}
              onChange={setDateWithTime}
              label="Select a date (time will be set to 10:15)"
              time="10:15"
            />
            <div className="mt-2 text-sm text-gray-500">
              Selected: {dateWithTime.toLocaleString()}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium">Time Field</h4>
            <FormTimeField
              value="14:30"
              onChange={(value) => console.log("Time changed:", value)}
              label="Select a time"
              as="time"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
