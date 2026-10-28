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



router.post("/", function (req,res) { 
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