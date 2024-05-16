#### What the issue was.

que la funcion process order crecera y crecera segun se vayan agregando nuevas tipos de ordenes.
Tambien la misma clase esta ejecutando muchas responsabilidades, lo que romperia con otro principio.

#### Which SOLID principle it violated.

Open/Close
Interface Segregation
Single Responsability

#### How your change addresses this violation.

Crear una interface que implemente el proceso de la orden pero donde existiran las clases Standar y Express donde cada una ejecutara su propio proceso de orden.
Separar en varias clases la funcionalidad para que cada una se encargue de realizar actividades propias

#### The benefits your changes bring to the system’s architecture.

Permite que en un futuro, menor afectacion a modulos independientes ya que cambios realizados, solo se realizaran en ciertas partes del codigo. Esto beneficiara tambien al uso de Unit Test y de pruebas por parte de QA.
