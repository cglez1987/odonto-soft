import { Diagnostico } from "./diagnostico";
import { Tratamiento } from "./tratamiento";

export class InspeccionBucal {
    id: string;
    fechaRealizacion: Date;
    patientId: string;
    list_diagnostico: Diagnostico[];
    observaciones_diagnostico: string;
    list_tratamiento: Tratamiento[];
    observaciones_tratamiento: string;
    costoTotal?: number;
}