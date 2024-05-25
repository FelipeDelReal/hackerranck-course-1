# Design Patters in a Project Scenario

### 1. Design Problem Solving:

- Global Configuration Management: Design a system that ensures a single, globally accessible configuration object without access conflicts.

  - Para este escenario lo mejor sera utilizar: Singleton Pattern, esto para solamente tener una instancia que sera utilizada a lo largo de vida de la aplicacion. Igual puede contemplarse el uso de Lazy para ayudar en evitar problemas de recursos y concurrencia.

          public sealed class Singleton
          {
              private static readonly Lazy<Singleton> lazy = new Lazy<Singleton>(() => new Singleton());

              public static Singleton Instance { get { return lazy.Value; } }

              private Singleton()
              {
              }
          }

- Dynamic Object Creation Based on User Input: Implement a system to dynamically create various types of user interface elements based on user actions.

  - Utilizaremos Factory Pattern ya que nos permitira crear varios tipos de usuario y al ir agregando a futuro mas sera mas facil el hacerlo.

          public interface IUIElement
          {
              void Render();
          }

          public class Button : IUIElement
          {
              public void Render()
              {
                  Console.WriteLine("Rendering Button");
              }
          }

          public class TextBox : IUIElement
          {
              public void Render()
              {
                  Console.WriteLine("Rendering TextBox");
              }
          }

          public class UIElementFactory
          {
              public IUIElement Create(string elementType)
              {
                  switch (elementType)
                  {
                      case "Button":
                          return new Button();
                      case "TextBox":
                          return new TextBox();
                      default:
                          throw new ArgumentException("Invalid element type", nameof(elementType));
                  }
              }
          }

          // Usage
          var factory = new UIElementFactory();

          Console.WriteLine("Enter the type of UI element you want to create (Button/TextBox):");
          string elementType = Console.ReadLine();

          var element = factory.Create(elementType);
          element.Render();

- State Change Notification Across System Components: Ensure components are notified about changes in the state of other parts without creating tight coupling.

  - Usaremos Observer Pattern para esta solucion, ya que suscribiremos aquellos elementos que requieran ser notificados. Se puede utilizar en C# las interfaces IObserver<T> y IObservable<T> que ya vienen con el framework de .Net pero agregaremos un ejemplo de hacerlo desde cero.

          public interface IObserver
          {
              void Update(string message);
          }

          public class Observer : IObserver
          {
              private readonly string _name;

              public Observer(string name)
              {
                  _name = name;
              }

              public void Update(string message)
              {
                  Console.WriteLine($"{_name} received: {message}");
              }
          }

          public interface ISubject
          {
              void RegisterObserver(IObserver observer);
              void RemoveObserver(IObserver observer);
              void NotifyObservers(string message);
          }

          public class Subject : ISubject
          {
              private readonly List<IObserver> _observers = new List<IObserver>();

              public void RegisterObserver(IObserver observer)
              {
                  _observers.Add(observer);
              }

              public void RemoveObserver(IObserver observer)
              {
                  _observers.Remove(observer);
              }

              public void NotifyObservers(string message)
              {
                  foreach (var observer in _observers)
                  {
                      observer.Update(message);
                  }
              }
          }

          var subject = new Subject();

          var observer1 = new Observer("Observer 1");
          var observer2 = new Observer("Observer 2");

          subject.RegisterObserver(observer1);
          subject.RegisterObserver(observer2);

          subject.NotifyObservers("Hello, observers!");

          subject.RemoveObserver(observer1);

          subject.NotifyObservers("Hello, remaining observers!");

- Efficient Management of Asynchronous Operations: Manage multiple asynchronous operations like API calls which need to be coordinated without blocking the main application workflow.
  - Para evitar bloqueos del flujo de la aplicacion principal, debemos hacer uso de metodos asincronos, asi evitamos dicho bloqueo. En frontend utilizar funcionalidades de Promises para el llamado de las APIs y en backend, en este caso de .Net usar la funcionalidad de Task usando await y async.

### 2. Project Execution Simulation:

- Simulate the application of these patterns in a hypothetical software project. Document the approach, rationale, and integration process of the chosen patterns as they apply to the design challenges.

  - Tendremos una aplicacion dedicada a la creacion de partes para automovil donde tendran acceso diferentes usuarios para validar los procesos.
  - En el frontend realiaremos la peticiones a los APIs utilizando llamadas asincronas por medio de promesas utilizando sintaxis de async y await. Tendremos varios dashboard que se registraran como observadores para al realizar un cambio en el proceso, reciban la actualizacion y se refresque el detalle que se presenta en el dashboard.
  - En backend tambien manejaremos sintaxis de async y await para la parte de procesos que interactuen con base de datos, otras solicitudes http, etc. Crear Factory para los diferentes usuarios teniendo acciones especificas dependiendo de su tipo. Agregaremos la funcionalidad de realizar log para monitorear el correcto funcionamiento de los servicios, utilizando el patron de singleton para la unica instancia que registrara en el Log.
