import { Position } from './positions';

export enum IngredientCodes {
  'IN_EXTRA_01' = 'IN_EXTRA_01',
  'IN_EXTRA_02' = 'IN_EXTRA_02',
  'IN_SNAPS_01' = 'IN_SNAPS_01',
  'IN_SNAPS_02' = 'IN_SNAPS_02',
  'IN_SNAPS_03' = 'IN_SNAPS_03',
  'IN_SNAPS_04' = 'IN_SNAPS_04',
  'IN_SNAPS_05' = 'IN_SNAPS_05',
  'IN_SNAPS_06' = 'IN_SNAPS_06',
  'IN_SNAPS_07' = 'IN_SNAPS_07',
  'IN_SNAPS_08' = 'IN_SNAPS_08',
  'IN_BAGXX_01' = 'IN_BAGXX_01',
  'IN_BAGXX_02' = 'IN_BAGXX_02',
  'IN_SKUUL_01' = 'IN_SKUUL_01',
  'IN_REGIS_01' = 'IN_REGIS_01',
  'IN_REGIS_02' = 'IN_REGIS_02',
  'IN_REGIS_03' = 'IN_REGIS_03',
  'IN_REGIS_04' = 'IN_REGIS_04',
  'IN_REGIS_05' = 'IN_REGIS_05',
  'IN_REGIS_06' = 'IN_REGIS_06',
  'IN_REGIS_07' = 'IN_REGIS_07',
  'IN_RESUL_01' = 'IN_RESUL_01',
  'IN_RESUL_02' = 'IN_RESUL_02',
  'IN_RESUL_03' = 'IN_RESUL_03',
  'IN_RESUL_04' = 'IN_RESUL_04',
  'IN_RESUL_05' = 'IN_RESUL_05',
  'IN_RESUL_08' = 'IN_RESUL_08',
}

export interface Ingredient {
  id: number;
  code: IngredientCodes;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: null;
  position: Position;
  ranges: Range[];
}

export interface Range {
  id: number;
  isAValueRange: boolean;
  isADateRange: boolean;
  from: number;
  to: number;
  dateFrom: string;
  dateTo: string;
  points: number;
  isActive: boolean;
  assignPoints: boolean;
  isDeleted: boolean;
  deletedAt: string;
  ingredient: Ingredient;
}

/*
  IN_EXTRA_01:  Puntos Extra
  IN_EXTRA_02:  Descuentos Extra 
  IN_SNAPS_01:  Cargar factura válida
  IN_SNAPS_02:  Asignar puntos a mi supervisor, por la factura que cargué
  IN_SNAPS_03:  Verifica si el participante ya cumplió sus puntos de IN_SNAPS_01, si es así,
                la factura cambia a estado de FOR_DATA
  IN_SNAPS_04:  Cuando una factura es aprobada, verifica si el participante ya cumplió sus puntos de
                IN_SNAPS_01, si es así, la factura cambia a estado de FOR_DATA TODAS las facturas Pendientes
                restantes de ese mes que haya cargado
  IN_SNAPS_05:  Revisa los puntos de los SKUs cargados de facturas válidas y los suma, si el total es mayor o igual
                al campo "HASTA" de los rangos, entonces se le asigna el valor de "HASTA", case contrario, no se le
                asigna nada.
  IN_SNAPS_06:  Crea una transacción extra a un participante ficticio por la misma cantidad de puntos. Esto es para que
                la bolsa de puntos pueda agotarse más rápido, su padre siempre tiene que ser IN_BAGXX_02.
  IN_BAGXX_01:  Verificar puntos en la bolsa, SIEMPRE va vinculado a IN_SNAPS_01, y va en segundo lugar
  IN_BAGXX_02:  Verificar puntos en la bolsa, SIEMPRE va vinculado a IN_SNAPS_05, y va en segundo lugar. Similar a IN_BAGXX_01
                pero esta mecánica ocupa la estructura de grafo.
  IN_REGIS_01:  Verifica quién registró un Job Profile, y asigna puntos PENDIENTES a quien lo creó
  IN_REGIS_02:  Asigna puntos por haber APROBADO y ACTIVADO al participante que registré con su Job Profile
  IN_REGIS_03:  Asigna puntos a mi supervisor por haber APROBADO y ACTIVADO al participante que registré 
                con su Job Profile
  IN_REGIS_04:  Asigna puntos PENDIENTES al dueño del Job Profile
  IN_REGIS_05:  Cambia los puntos pendientes por puntos ACTIVOS al dueño del Job Profile por haber APROBADO 
                y ACTIVADO al participante
  IN_REGIS_06:  Asigna puntos a supervisor por haber APROBADO y ACTIVADO a sus participantes registrados
  IN_REGIS_07:  Cambia los puntos pendientes por puntos ACTIVOS al dueño del Job Profile por haber APROBADO el 
                perfil de trabajo
  IN_RESUL_01:  Objectivo/Resultado, para obtener el cumplimento se divide el valor 2 (resultado) entre 
                el valor 1 (objetivo) y se multiplica por 100
  IN_RESUL_02:  Mecánica de SOLO RESULTADO, se tomará este resultado y se lo comparará con la tabla de 
                rangos y se asignarán dichos puntos
  IN_RESUL_03:  Mecánica de SOLO RESULTADO, a diferencia de IN_RESUL_02, en este caso el resultado es 
                comparado con la tabla de rangos, y se MULTIPLICA el resultado para los puntos a asignar
  IN_RESUL_04:  Mecánica de SOLO RESULTADO, el resultado de este KPI es dividido para el resultado del PADRE, 
                y ese cumplimiento es comparado con la tabla de rangos para asignar los puntos
  IN_RESUL_05:  Mecánica Objetivo/Resultado, muy similar a IN_RESUL_01, pero en este caso, aunque logre en objetivo,
                NO se le asignan puntos. 
*/

export const IngredientCodeExplanation = {
  [IngredientCodes.IN_EXTRA_01]: 'Puntos extra',
  [IngredientCodes.IN_EXTRA_02]: 'Descuentos extra',
  [IngredientCodes.IN_SNAPS_01]: 'Cargar factura válida',
  [IngredientCodes.IN_SNAPS_02]:
    'Asignar puntos a supervisor, por la factura que el participante cargó',
  [IngredientCodes.IN_BAGXX_01]:
    'Verificar puntos en la bolsa, SIEMPRE va vinculado a IN_SNAPS_01, y va en segundo lugar',
  [IngredientCodes.IN_REGIS_01]:
    'Verifica quién registró un Job Profile, y asigna puntos PENDIENTES a quien lo creó',
  [IngredientCodes.IN_REGIS_02]:
    'Asigna puntos por haber APROBADO y ACTIVADO al participante que registré con su Job Profile',
  [IngredientCodes.IN_REGIS_03]:
    'Asigna puntos a mi supervisor por haber APROBADO y ACTIVADO al participante que registré con su Job Profile',
  [IngredientCodes.IN_REGIS_04]:
    'Asigna puntos PENDIENTES al dueño del Job Profile',
  [IngredientCodes.IN_REGIS_05]:
    ' Cambia los puntos pendientes por puntos ACTIVOS al dueño del Job Profile por haber APROBADO y ACTIVADO al participante',
  [IngredientCodes.IN_REGIS_06]:
    'Asigna puntos a supervisor por haber APROBADO y ACTIVADO a sus participantes registrados',
  [IngredientCodes.IN_REGIS_07]:
    'Cambia los puntos pendientes por puntos ACTIVOS al dueño del Job Profile por haber APROBADO el perfil de trabajo',
  [IngredientCodes.IN_RESUL_01]:
    'Objectivo/Resultado, para obtener el cumplimento se divide el resultado para el objetivo y se multiplica por 100',
  [IngredientCodes.IN_RESUL_02]:
    'Mecánica de SOLO RESULTADO, se tomará este resultado y se lo comparará con la tabla de rangos y se asignarán dichos puntos',
  [IngredientCodes.IN_RESUL_03]:
    'Mecánica de SOLO RESULTADO, a diferencia de IN_RESUL_02, en este caso el resultado es comparado con la tabla de rangos, y se MULTIPLICA el resultado para los puntos a asignar',
  [IngredientCodes.IN_RESUL_04]:
    'Mecánica de SOLO RESULTADO, el resultado de este KPI es dividido para el resultado del PADRE, y ese cumplimiento es comparado con la tabla de rangos para asignar los puntos',
  [IngredientCodes.IN_RESUL_05]:
    'Mecánica Objetivo/Resultado, muy similar a IN_RESUL_01, pero en este caso, aunque logre en objetivo, NO se le asignan puntos.',
};
