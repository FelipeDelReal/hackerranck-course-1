# SQL Query Optimization

### 1. Orders Query: Retrieve orders with many items and calculate the total price

##### Query

    SELECT Orders.OrderID, SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
    FROM Orders
    JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID AND OrderDetails.Quantity > 10
    GROUP BY Orders.OrderID;

##### Optimization

- Se debe de crear indice a las columnas `Orders.OrderID`, `OrderDetails.OrderID` y `OrderDetails.Quantity` ya que son utilizadas tanto para realizar un join, filtro y/o ordenamiento
- Se puede cambiar el where dentro del join para asi evitar mayor procesamiento de informacion
- Hablando de estructuracion de tabla, se pudiera tener en la tabla `Orders` una columna con `TotalPrice` para evitar hacer calculos si el query es sobre un servicio muy demandado

##### Refactor

    CREATE INDEX idx_order_order_id ON Orders(OrderID);
    CREATE INDEX idx_order_detail_order_id_quantity ON OrderDetails(OrderID, Quantity);

    SELECT Orders.OrderID, SUM(OrderDetails.Quantity * OrderDetails.UnitPrice) AS TotalPrice
    FROM Orders
    JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID WHERE OrderDetails.Quantity > 10
    GROUP BY Orders.OrderID;

### 2. Customer Query: Find all customers from London and sort by CustomerName

##### Query

    SELECT CustomerName
    FROM Customers
    WHERE City = 'London'
    ORDER BY CustomerName;

##### Optimization

- Se debe de crear indice a las columnas `Customers.City` y `Customers.CustomerName` ya que son utilizadas tanto para realizar filtro y ordenamiento

##### Refactor

    CREATE INDEX idx_costumers_city_costumer_name ON Customers(City, CustomerName);

    SELECT CustomerName
    FROM Customers
    WHERE City = 'London'
    ORDER BY CustomerName;

# NoSQL Query Implementation

### 1. User Posts Query: Retrieve the most popular active posts and display their title and like count.

##### Query

    db.posts
        .find({ status: "active" }, { title: 1, likes: 1 })
        .sort({ likes: -1 });

##### Optimization

- Se debe de crear indices para las columnas `status` y `likes`

##### Refactor

    db.posts.createIndex({ status: 1, likes: -1 });

    db.posts
        .find({ status: "active" }, { title: 1, likes: 1 })
        .sort({ likes: -1 });

### 2. User Data Aggregation: Summarize the number of active users by location.

##### Query

    db.users.aggregate([
        { $match: { status: "active" } },
        { $group: { _id: "$location", totalUsers: { $sum: 1 } } },

]);

##### Optimization

- Se debe de crear indices para la columna `status`

##### Refactor

    db.users.createIndex({ status: 1 });

    db.users.aggregate([
        { $match: { status: "active" } },
        { $group: { _id: "$location", totalUsers: { $sum: 1 } } },
