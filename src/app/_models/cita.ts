import { EventAction } from "calendar-utils";

export class Cita {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    draggable: boolean;
    actions?: EventAction[];
}