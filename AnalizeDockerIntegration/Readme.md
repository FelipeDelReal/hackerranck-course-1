#### 1. Review Simulated CI/CD Pipeline Configuration:

- Build Stage:
  - Code Commit:
  - Docker Image Creation:
- Test Stage:
  - Automated Testing:
- Deployment Stage:
  - Container Registry:
  - Orchestration and Deployment:

#### 2. Analyze Enhancements and Potential Issues

- Enhancements
  - Consistencia: Se asegura que la aplicacion se ejecute de la misma manera en cada ambiente.
  - Isolacion: Separa aplicaciones en diferentes contenedores, esto evita que una interfiera con la otra.
  - Escalabilidad: Hace facil el escalar una aplicacion, ya sea la demanda sea subir o bajar recursos.
- Potential Issues
  - Persistencia de datos: La informacion es volatil en un contendor, ya que por default tiene esa configuracion.
  - Seguridad: Si algo afecta al Docker daemon, podria afectar a todos los contenedores.

#### 3. Write an Analysis Report:

- Summarizes how Docker is integrated into each stage of the CI/CD pipeline.
  - Tener el archivo Dockerfile en el repositorio de GIT para este ser leido durante el proceso.
  - En el proceso del pre-despliegue, registrar el contenedor con las nuevas actualizaciones para despues relizar el despliegue con dicha imagen a los diferentes ambientes.
  - Se pude utilizar un contendor para levantar una imagen donde se puedan realizar la ejecucion y validacion de pruebas automatizadas para las revisiones DAST.
- Analyzes the benefits and potential challenges identified during the review.
  - Parte de los beneficios del uso de Docker es garantizar que los diferentes ambientes que se vayan a utilizar tengan coherencia y simetria.
  - Al realizar un registro del contenedor, el realizar un escalamiento de los servicios y/o apps a desplegarse, es mucho mas rapido y sencillo.
- Suggests theoretical solutions or best practices to overcome the challenges.
  - Uno de los desafios pudiera ser encontrar la imagen adecuada, la cual parte de las buenas practicas seria encontrar una imagen confiable, ya sea por parte de quien la ofrece y las reseñas que esta pueda tener.
  - Utilizar herramientas de orquestracion como Kubernetes para automatizar escalamiento y mantenimiento de contenedores.
  - Siempre una buena practica es monitorear la salud y rendimiento de los contenedores desplegados.
  - Limitar recursos siempre es importante, ya que un contenedor por default puede consumir ilimitadamente recursos.
