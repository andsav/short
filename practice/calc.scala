#!/usr/bin/env scala
/**
* [practic/calc]
*
* Purpose       : Interprets mathematical expression [ +, -, *, /, () ]
*
* Input         : Mathematical expression such as "3+4-(2+10)" (no spaces)
*
* Output        : Result
*
* Author        : Andrei Savin <andrei@andreisavin.com>
*/

class Node(sub: Either[Int, Array[Node]],
           op: Option[(Array[Int] => Int)] = null) {

  def this(n: Int) = this(Left(n))
  
  def this(sub: Array[Node], op: (Array[Int] => Int)) = this(Right(children), Some(op))
  
  def total(): Int = this.children match {
    case Left(x) => x
    case Right(x) => this.op match {
        case Some(op) => op(x.map(_.total))
        case None => throw new Exception("No expression to reduce nodes")
    }
  }
}

def operation(op:Char):(Array[Int] => Int) = op match {
  case '+' => (xs:Array[Int]) => xs.reduceLeft(_ + _)
  case '-' => (xs:Array[Int]) => xs.reduceLeft(_ - _)
  case '*' => (xs:Array[Int]) => xs.reduceLeft(_ * _)
  case '/' => (xs:Array[Int]) => xs.reduceLeft(_ / _)
}

def precedence(op:Char):Int = op match {
  case '*' => 3
  case '/' => 2
  case '+' => 1
  case '-' => 1
}

def make_node(expression: String):Node = {
  println(expression)

  if(expression.length() == 0) {
    throw new Exception("Empty expression")
  }

  var left:Node
  var i = 0

  if(expression.charAt(0) == '(')) {
    var open = 1

    while(expression.charAt(i) != ')' || open != 0) {
      i += 1

      if(expression.charAt(i) == ')') open -= 1
      else if(expression.charAt(i) == '(') open += 1

      if(i == expression.length())
        throw new Exception("Mismatched parenthesis")
    }

    left = make_node(expression.substring(0, i))
  }
  else if(expression.charAt(0).isDigit) {

    while(expression.charAt(i).isDigit) {
      i += 1
    }

    

  }

  return new Node(5)
}

object Calc extends App {
  val tree = make_node(args(0))

}

Calc.main(args)
