import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/api/status', (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0"
  });
});

app.get("/api/estudiantes", function (req, res) {
    res.status(200).json(estudiantes);
})

app.post("/api/estudiantes", function (req,res) { 
  const { nombre, email, bootcamp } = req.body ?? {};

  if (!email) {
    res.status(400).json({
      mensaje: "El email es obligatorio"
    });
    return;
  }

app.put("/api/estudiantes/:id", function (req, res) {
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

app.delete("/api/estudiantes/:id", function (req, res) {
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


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



interface Estudiante { 
  id : number;
  nombre : string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];
let siguienteId: number = 1;
