# Factory Pattern

## What is the Factory Pattern?

The Factory Pattern is a creational design pattern that provides an interface for creating objects in a superclass, but
allows subclasses to alter the type of objects that will be created. This pattern provides a way to delegate the
responsibility of object instantiation to subclasses, while maintaining a common interface across all classes.

## When to use the Factory Pattern?

The Factory Pattern is useful when:

A class cannot anticipate the type of objects it needs to create.
A class wants to delegate the responsibility of object creation to its subclasses.
A class wants to provide a common interface for creating objects, but allow subclasses to alter the types of objects
that are created.

## Example Code in Java: Animals

Here's an example implementation of the Factory Pattern in Java using animals. In this example, we'll create an Animal
interface, and two Concrete Products: Cat and Dog. We'll also create a Creator interface and a Concrete Creator class to
implement the factory method.

```java
public interface Animal {
  void speak();
}
```

```java
public class Cat implements Animal {
  public void speak() {
    System.out.println("Meow");
  }
}
```

```java
public class Dog implements Animal {
  public void speak() {
    System.out.println("Woof");
  }
}
```

```java
public interface AnimalFactory {
  Animal createAnimal();
}
```

```java
public class ConcreteAnimalFactory implements AnimalFactory {
  public Animal createAnimal(String type) {
    if (type.equalsIgnoreCase("cat")) {
      return new Cat();
    } else if (type.equalsIgnoreCase("dog")) {
      return new Dog();
    } else {
      throw new IllegalArgumentException("Invalid animal type: " + type);
    }
  }
}
```

```java
public class Main {
  public static void main(String[] args) {
    AnimalFactory animalFactory = new ConcreteAnimalFactory();

    Animal cat = animalFactory.createAnimal("cat");
    cat.speak(); // output: "Meow"

    Animal dog = animalFactory.createAnimal("dog");
    dog.speak(); // output: "Woof"
  }
}
```
In this example, we define an Animal interface with a speak() method. We then create two Concrete Products that
implement this interface: Cat and Dog.

We also define an AnimalFactory interface with a createAnimal() method, and a Concrete Creator class called
ConcreteAnimalFactory that implements this interface. In the createAnimal() method, we use a switch statement to
determine which Concrete Product to create, and return an instance of that product.

Finally, in the main method, we create an instance of the Concrete Creator class and use it to create instances of the
Concrete Products. We then call the speak() method on each object to demonstrate that they work correctly.