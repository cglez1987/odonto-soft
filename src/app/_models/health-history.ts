export class HealthHistory {
    id: string;
    patientId: string;
    tiene_tratamiento_medico: boolean;
    tratamiento_medico: string;
    sangra_mucho: boolean
    hizo_test_elisa: boolean
    tiene_enfermedad: boolean
    enfermedad: string
    tiene_medicamentos: boolean
    medicamentos: string
    tiene_cirugias: boolean
    cirugias: string
    tiene_transfusion_sangre: boolean
    motivo_consulta: string
    ultima_visita_odonto: Date
    causa_perdida_dientes: string
    cant_cepillados: string
    tolera_anestecia_odonto: boolean;
    observaciones: string
    elementos_limpieza_bucal: string[]

}