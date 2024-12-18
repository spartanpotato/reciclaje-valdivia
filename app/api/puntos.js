// [vidrio, latas, plastico, papel y carton, organico]
import { NextResponse } from "next/server";

export const puntos =[
    {id: 1, nombre : "teniente merino", coordenadas : [-39.83724346811184, -73.21689739542651], 
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 2, nombre : "parque kramer", coordenadas : [-39.832286781644754, -73.22837769564308],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 3, nombre : "Circunvalación sur &  rene Schneider", coordenadas : [-39.84626687810097, -73.21742145138901], 
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 4, nombre : "Intendente Jaime de La Guarda", coordenadas : [-39.85039674335389, -73.23416951804715],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 5, nombre : "C Bennet 1699-1601", coordenadas : [-39.82966957406156, -73.23794358532248],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 6, nombre : "Guillermo Frick 498-400", coordenadas : [-39.8252181540048, -73.24368848362403],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 7, nombre : "Los Manzanos, perales, Teja sur", coordenadas : [-39.818241051481216, -73.2569408098946],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 8, nombre : "Los Robles & Los Raulies", coordenadas : [-39.80772403273916, -73.26262866099215],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 9, nombre : "Los Molinos", coordenadas : [-39.84525091218071, -73.39450441891012],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 10, nombre : "Carlos Duce & Del castillo", coordenadas : [-39.8739749771411, -73.39529625178953],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 11, nombre : "Condominio riveras de estancilla", coordenadas : [-39.84343981855946, -73.29905817237857],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 12, nombre : "Condominio Torobayo", coordenadas : [-39.83400304223973, -73.2690306299266],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 13, nombre : "Silos de Torobayo", coordenadas : [-39.83308821316143, -73.2702208655435],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 14, nombre : "Condominio Silos de Torobayo", coordenadas : [-39.83224589862382, -73.2695765226376],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 15, nombre : "El Romance & vicente Carvallo", coordenadas : [-39.792575182891646, -73.21763448306706],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 16, nombre : "República 414", coordenadas : [-39.79548920776816, -73.21805439382153],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 17, nombre : "calle Balmaceda & Laguna San Rafael", coordenadas : [-39.79898463424185, -73.20591183787205],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 18, nombre : "Polan & Caspana", coordenadas : [-39.80032055399445, -73.20690384331188],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 19, nombre : "Condominio Miraflores 1", coordenadas : [-39.86281234445523, -73.24750853348291],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 20, nombre : "Condominio Miraflores 2", coordenadas : [-39.86521986612106, -73.24297282080647],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 21, nombre : "Parque Santa Ines", coordenadas : [-39.81018358864245, -73.25714112071987],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 1}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 22, nombre : "Cervecería Kunstamann", coordenadas : [-39.83748652098618, -73.2787712947148],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 23, nombre : "Avda Matta 216", coordenadas : [-39.80605223357888, -73.21649343258606],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 1}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 24, nombre : "cecof Norte Grande", coordenadas : [-39.80629223784735, -73.22134648164848],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 25, nombre : "Rademacher Weiss Norma - Italia 1761", coordenadas : [-39.833420789668544, -73.23860331952082],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 26, nombre : "Arriendo Valdivia - Gabriela - Las Parras 2", coordenadas : [-39.85141293019937, -73.1950547781003],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 27, nombre : "Irlanda 1949-1901", coordenadas : [-39.83634285965833, -73.23999365680962],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 28, nombre : "Los Venados Nte. 703-727", coordenadas : [-39.85006939152466, -73.2440151076109],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 29, nombre : "Mirador Vapor Canelos - T-350", coordenadas : [-39.86025027343892, -73.34347571813547],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 30, nombre : "Robinson Ampuero Pérez 152-92", coordenadas : [-39.8537770566917, -73.24528190377413],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 31, nombre : "Guillermo Frick 201-299", coordenadas : [-39.82457760053738, -73.24761674511498],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 32, nombre : "Altos del cruces", coordenadas : [-39.82492778795877, -73.27460080086854],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 33, nombre : "Altos del cruces", coordenadas : [-39.82449120207287, -73.27735578009623],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 34, nombre : "San Ignacio", coordenadas : [-39.830806167585074, -73.4017803514601],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 35, nombre : "Tornagaleones 180", coordenadas : [-39.86367529993661, -73.39324893275798],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 36, nombre : "los 3 espinos", coordenadas : [-39.86276330150867, -73.36246166056425],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 37, nombre : "C. Río Copiapó", coordenadas : [-39.793238665711144, -73.20156234123885],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 38, nombre : "Condominio", coordenadas : [-39.79733615476746, -73.16613391646581],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 39, nombre : "Villa Rocura y Villa Masisa", coordenadas : [-39.808582522900835, -73.21488255883754],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 40, nombre : "Humedal Angachilla", coordenadas : [-39.856216890630705, -73.23183931834382],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 41, nombre : "T-352", coordenadas : [-39.842534269749336, -73.40377013869221],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 42, nombre : "Niebla", coordenadas : [-39.875609929806494, -73.38783013635154],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 43, nombre : "1 Campana de reciclaje pudú", coordenadas : [-39.83305783156415, -73.2112366900782],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 44, nombre : "condominio Fundo la Esperanza", coordenadas : [-39.857084990099295, -73.20853751829904],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 0}, {tipo : "papel/carton", estado : 0}, {tipo : "organico", estado : 0}]},

    {id: 45, nombre : "Universidad austral de chile", coordenadas : [-39.832604, -73.252359],
    tipos : [{tipo : "vidrio", estado : 1}, {tipo : "latas", estado : 1}, {tipo : "plastico", estado : 1}, {tipo : "papel/carton", estado : 1}, {tipo : "organico", estado : 0}]},

    
];

export async function GET(){
    return new NextResponse.json(puntos);
  }