### Designing and Implementing a Microservices Architecture

- Monolithic E-Commerce Application Description:
  The application is a traditional e-commerce platform that encompasses all functionalities within a single, unified software architecture. The application handles the following key operations:

      - User Management: Manages user profiles, authentication, and authorization. It stores personal information, manages login sessions, and handles user preferences.

      - Product Catalog: Maintains a comprehensive list of products, including descriptions, pricing, images, and inventory levels. It supports product search and categorization functionalities.

      - Order Processing: Manages all aspects of the ordering process, from cart management to order placement, payment processing, and order history tracking.

      - Customer Support: Handles customer inquiries, returns, complaints, and feedback through a ticket-based system integrated with the user and order databases.

The application is built on a single relational database that holds all user data, product information, orders, and customer support interactions. It currently operates on a single code base with a web-based frontend that communicates directly with the backend server.

The platform has been experiencing challenges with scaling during high-traffic periods, frequent downtimes during updates, and increasing difficulty in implementing new features without affecting existing functionalities. The goal is to decompose this monolithic architecture into a microservices-based architecture to address these issues and improve overall agility and scalability.

#### Implementation Simulation:

- Migration Roadmap
  - Prioritization of services to be migrated
    - Inicialmente ya se encuentran identificados 4 diferentes dominios, los cuales separaremos en 4 microservicios. Debemos dar prioridad al microservicio que se encargara del acceso y registro de usuarios, despues el catalogo de productos, procesamiento de ordenes y como no con tanta importancia, atencion al cliente.
  - Identification of dependencies
    - El orden de prioridad se baso tal cual en las diferentes dependencias que se encuentran entre los usuarios que van a realizar solicitudes, el catalogo para poder procesar las ordenes y al final atencion al cliente por ser menos crucial para el negocio.
  - Strategy for data migration
    - Como ya contamos con una base de datos relacional, al migrarnos a microservicios, cada uno manejara su propia estructura de base de datos, por lo que se procedera a crear scripts para la migracion de dicha informacion. Dependera de nuestro nivel de recursos para ver si optamos por una liberacion incremental o si no contamos con ellos, big bang.
- Architecture Documentation
  Nos migraremos a microservicios utilizando algun proveedor en la nube para el manejo de la infraestructura y otros servicios. Esta seria la mejor opcion ya que no tendremos problemas que se presentan al manejar onPromises, se podra realizar un escalamiento y despliegue de una manera sencilla y rapida.
  Los microservicios viviran atras de un Apigateway para un solo punto de entrada y poder acceder a cada uno de ellos.
  Separaremos la base de datos para cada microservicio. Esto ayudara al momento de brindar mas recursos a la base de datos que lo necesite y mejorar la isolacion de cada una de estas.

      - User Management: Maneja perfiles de usuario, autenticacion y autorizacion. Sera un API Rest que autenticara y generara el token por el cual se accedera al resto de los microservicios. Podemos ayudarnos de proveedores externos para el manejo de autorizacion y autenticacion, ejemplo Auth0.
      - Product Catalog: Lista de productos. Api Rest validando el JWT la cual menejara su base de datos relacional.
      - Order Processing: Procesamento de ordenes, pagos e historico de transacciones. Api Rest validando el JWT la cual menejara su base de datos relacional.
      - Customer Support: Manejo de solicitudes, quejas, reembolsos del cliente. Api Rest validando el JWT la cual menejara su base de datos relacional.
