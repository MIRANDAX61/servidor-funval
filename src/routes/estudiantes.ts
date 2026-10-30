import { Router } from "express";

const router = Router();

interface Estudiante { 
  id : number;
  nombre : string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let siguienteId: number = 1;


router.get("/", function (req, res) {
    // #swagger.description = 'Lista estudiantes y permite filtrar por bootcamp'
    const bootcamp = req.query.bootcamp;

    if (typeof bootcamp === "string") {
        const filtrados = estudiantes.filter(
            (estudiante) => estudiante.bootcamp === bootcamp
        );

        res.status(200).json(filtrados);
        return;
    }

    res.status(200).json(estudiantes);
});

router.get("/:id", function (req, res) {
    // #swagger.description = 'Busca un estudiante por ID. Responde 404 si no existe.'

    const idBuscando = Number(req.params.id);

    const estudianteEncontrado = estudiantes.find(
        (estudiante) => estudiante.id === idBuscando
    );

    if (!estudianteEncontrado) {
        res.status(404).json({
            mensaje: "Estudiante no encontrado."
        });
        return;
    }

    res.status(200).json(estudianteEncontrado);
});

router.post("/", function (req,res) { 
// #swagger.description = 'Crea un estudiante. El email es obligatorio y el servidor genera el ID'
  const { nombre, email, bootcamp } = req.body ?? {};

  if (!email) {
    res.status(400).json({
      mensaje: "El email es obligatorio"
    });
    return;
  }

  const nuevoEstudiante: Estudiante = {
    id: siguienteId,
    nombre,
    email,
    bootcamp
  };

  estudiantes.push(nuevoEstudiante);
  siguienteId++;

  res.status(201).json(nuevoEstudiante);
});

  router.put("/:id", function (req, res) {
  // #swagger.description = 'Actualiza los datos de un estudiante existente'
    const idBuscando = Number(req.params.id);

    const estudianteEncontrado = estudiantes.find(
        (estudiante) => estudiante.id === idBuscando
    );

    if (!estudianteEncontrado) {
        res.status(404).json({
            mensaje: "Estudiante no encontrado."
        });
        return;
    }

    const { nombre, email, bootcamp } = req.body;

    estudianteEncontrado.nombre = nombre;
    estudianteEncontrado.email = email;
    estudianteEncontrado.bootcamp = bootcamp;

    res.status(200).json(estudianteEncontrado);
});

router.delete("/:id", function (req, res) {
// #swagger.description = 'Elimina un estudiante por su ID'
    const idBuscando = Number(req.params.id);

    const posicion = estudiantes.findIndex(
        (estudiante) => estudiante.id === idBuscando
    );

    if (posicion === -1) {
        res.status(404).json({
            mensaje: "Estudiante no encontrado"
        });
        return;
    }

    estudiantes.splice(posicion, 1);

    res.status(200).json({
        mensaje: "Estudiante eliminado correctamente"
    });
});

export default router;