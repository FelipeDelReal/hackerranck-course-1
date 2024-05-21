# Scenarios for Security Design:

### Scenario 1: Pseudo-Code for Authentication System

##### Pseudo-Code Example

    FUNCTION authenticateUser(username, password):
    QUERY database WITH username AND password
    IF found RETURN True
    ELSE RETURN False

##### Analisis

- Para la ejecucion de queries, se debe realizar el uso de `prepared statements with parameterized queries`, esto para sanitizar todo parametro a ejecutarse en el query.
- Los valores de contraseñas almacenadas deben de pasar por un proceso de hashing por si se ve comprometida la base de datos, sera muy imposible el decifrar la contraseña almacenada.
- Se podria agregar funcionalidad para el uso de `Multi-Factor authentication` pero ya dependeria de los recursos.
- Asignar algun limite de intentos de autenticacion, si se llega al limite, bloquear dicho usuario dandole un proceso aparte para poder realizar el desbloqueo seguro.

##### Pseudo-Code Refactor

    FUNCTION authenticateUser(username, password):
    HASHING the receipted password using a salt
    GENERATE a prepare statement with the query
    ADD parameterized values with username and password
    EXECUTE prepared statement
    IF found RETURN True
    ELSE RETURN False

### Scenario 2: JWT Authentication Schema

##### Design Outline:

    DEFINE FUNCTION generateJWT(userCredentials):
    IF validateCredentials(userCredentials):
        SET tokenExpiration = currentTime + 3600 // Token expires in one hour
        RETURN encrypt(userCredentials + tokenExpiration, secretKey)
    ELSE:
        RETURN error

##### Analisis

- Una vez ya sanitizadas las propiedades a utilizarse en el proceso de validar credenciales y dando estas como exitosas, se debe de asignar al token a generarse lo siguiente para tomar en un proceso futuro de validacion:
  - iss: unidad de la cual se realiza el firmado
  - aud: asignar audiencia a la cual esta dirigido el token
  - roles: asignar un rol al usuario
- Se debe realizar un firmado del token utilizando algun algoritmo confiable, ejemplos: HMAC SHA256 o RSA.
- Secret key debe ser almacenado en algun lugar seguro, si se cuenta con infraestructura en la nube, existen herramientas las cuales pueden brindar seguridad al almacenar y proporcionar dicha informacion, ejemplo SecretKeyVault en Azure o AWS Secret Manager
- Otra opcion seria utilizar otras soluciones que dispongan la seguridad del manejo de usuarios, usando sus funciones de autenticacion y autorizacion.

##### Design Outline Refactor:

    DEFINE FUNCTION generateJWT(userCredentials):
    IF validateCredentials(userCredentials):
        SET data.tokenExpiration = currentTime + 3600
        SET data.iis = issuer
        SET data.audience = [app1, app2]
        SET data.role = admin
        SET data.userCredentials = userCredentials

        GET secretkey from local environment or cloud provider
        ENCRYPT using algorithm SHA256 (data, secretKey)
    ELSE:
        RETURN error

### Scenario 3: Secure Data Communication Plan

##### Outline for Data Protection:

    PLAN secureDataCommunication:
    IMPLEMENT SSL/TLS for all data in transit
    USE encrypted storage solutions for data at rest
    ENSURE all data exchanges comply with HTTPS protocols

##### Analisis

- Manejo de OpenSSL para generar certificados y asegurar los canales de comunicacion.
- Establecer `Cookie Security Configuration` agregando las opciones de `HttpOnly, Secure, SameSite` en el servidor para reducir los ataques desde el lado del cliente, prevenir intercepcion de envio de informacion.

##### Outline for Data Protection Refactor:

    PLAN secureDataCommunication:
        IMPLEMENT SSL/TLS for all data in transit
        Set-Cookie: SID=12345; Secure; HttpOnly; SameSite=Strict;
        USE encrypted storage solutions for data at rest(ejemplo: AWS KMS, S3, RDS)
        ENSURE all data exchanges comply with HTTPS protocols
