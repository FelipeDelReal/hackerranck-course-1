## Code Optimization Practice

### Exercise 1

##### JavaScript Snippet:

```
// Inefficient loop handling and excessive DOM manipulation
function updateList(items) {
  let list = document.getElementById("itemList");
  list.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = items[i];
    list.appendChild(listItem);
  }
}
```

##### Code Analysis:

- El snippet proporcionado, se puede identificar que dentro del ciclo se esta alterando el DOM, lo que esto no es recomendable por que provocara problemas de rendimiento al navegador, ya que estara actualizando la interfaz con informacion incompleta.

##### Implementing Optimizations:

```
function updateList(items) {
  let list = document.getElementById("itemList");
  let fragment = document.createDocumentFragment();

  items.forEach(item => {
    let listItem = document.createElement("li");
    listItem.innerHTML = item;
    fragment.appendChild(listItem);
  });

  list.innerHTML = "";
  list.appendChild(fragment);
}
```

- Se creo un fragmento de documento, al cual se le iran agregando los nuevos items generados y como este no esta renderizado, no existira algun problema de rendimiento.
- Al final se eliminara del DOM el componente anterior para despues agregar el nuevo componente con la informacion completa.

### Exercise 2

##### Java Snippet:

```
// Redundant database queries
public class ProductLoader {
    public List<Product> loadProducts() {
        List<Product> products = new ArrayList<>();
        for (int id = 1; id <= 100; id++) {
            products.add(database.getProductById(id));
        }
        return products;
    }
}
```

##### Code Analysis:

- La implementacion es erronea ya que esta realizando 100 llamadas a base de datos, lo que provocara lentitud ya sea por latencia entre servicios, queries y/o tablas no optimizadas.

##### Implementing Optimizations:

```
public class ProductLoader {
    public List<Product> loadProducts() {
        return database.getProductsByIdRange(1, 100);
    }
}
```

- Tener un en la capa de repositorio una implementacion lista para recibir un rango de registros, pensando que siempre seran IDs seguidos.

### Exercise 3

##### C# Snippet:

```
// Unnecessary computations in data processing
public List<int> ProcessData(List<int> data) {
    List<int> result = new List<int>();
    foreach (var d in data) {
        if (d % 2 == 0) {
            result.Add(d * 2);
        } else {
            result.Add(d * 3);
        }
    }
    return result;
}
```

##### Code Analysis:

- Se identifican calculos redundantes que pueden simplificarse

##### Implementing Optimizations:

```
public List<int> ProcessData(List<int> data) {
    return data
        .Select(d => d * (d % 2 == 0 ? 2 : 3))
        .ToList();
}
```

- Utilizando funciones que provienen del SDK de .Net se puede utilizar la funcion .Select para obtener un listado de datos procesados uno por uno y decidiendo que regresar en cada posicion de la lista.
- Al poder utilizar el operador ternario ya que solo tenemos una u otra opcion, podemos simplificar la decision de por que numero deseamos multiplicar

##### Evaluation:

Para el primer ejercicio, se debe de evitar el estar manipulando el DOM innecesariamente ya que esto conlleva a perdida de rendimiento en memoria.
Para el segundo ejercicio, evitaremos el llamado de varias solicitudes que provocaran lentitud en la respuesta deseada, al hacer el cambio a rangos, solo sera un solo llamado el que obtendra toda la informacion.
Del tercer ejercicio podemos concluir que conforme vamos avanzando en el tiempo, existen nuevas tecnologias que nos podran ayudar a optimizar nuestro codigo, por lo que mantenernos actualizados nos apoyara para lograr dicho proposito.
