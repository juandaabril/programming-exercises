# Template Method

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

## Task
This codebase that simulates different product sales scenarios. It includes services for selling recharges, PIN codes, and tickets. The code is organized to accommodate common functionalities and specific logic for each type of product sale. The goal of the refactoring process is to apply the Template Method design pattern to improve code structure and reusability.
