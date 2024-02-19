# MOSAIC

## Introduction

Connectivity. Solved!

Connectivity between separate design elements is a key aspect of the integration and assembly of large
systems. ***Mosaic*** represents a powerful and unique approach to managing the connectivity between components of
complex systems.

At the lowest level, connections are simply wires between two components. However, difficulty arises when managing millions of these
individual connections. How to view them, who is responsible, are they correct?
Mosaic provides tooling that manages large collections of connections in a unique way that solves many of
the issues found with the traditional approach. Historically, the common way to manage this complexity has been with
hierarchical descriptions, dividing up the problem into manageable chunks, worked on by separate teams, which later
get integrated into a final assembly. The main issue with this approach is that different disciplines naturally
break the problem down into different hierarchies, some examples are:
* logical design
* physical design
* subsets for verification
* special hierarchies for different modelling platforms like emulation
* power domain analysis
* *chiplets*.

Mosaic uses a data model optimized for integration and connectivity and has tooling to make it
easy for the user to navigate through large amounts of data represented in this model. The connectivity in the design
can be grouped and viewed in many different ways and does not rely on any prescribed hierarchical grouping. Generators
are provided to create output suitable for various modelling and analysis platforms.

## Understanding the Mosaic Data Model

Imagine a large spreadsheet where each row represents an individual connection between two components, A -> B. For
each one of these connections additional information is provided. For example the ports/interfaces that the
connections are connected to on each component.  While this would be adequate, *Mosaic* generalizes this idea a
little further.  Each row in the spreadsheet represents a call to a mutator that when invoked modifies the underlying
connectivity model that consists simply of components and wires between them.  In this way higher level concepts can
be incorporated, for example, an complex protocol level connection that has been configured with high level protocol
parameters that effect exactly what wires are present in the design.  Each mutation to the underlying model remembers
which line of the spreadsheet generated it so that it can be removed prior to rerunning the generation step.

![Spreadsheet generating netlist](../documentation/test.drawio.svg)

## The Implementation

The above spreadsheet-like model is implemented in a document database which enables the tool to easily select and filter
rows of the model and present them to the user for exploring and editing.

## Additional Unique Features

1. Connectivity information for ALL designs are captured into the same data table which enables some interesting use-cases.
  1. Easily displaying the differences between multiple designs.
  2. Representing the history of changes in a design.
  3. Elaborated design is saved in database saving time when generating subsequent outputs.

