#!/usr/bin/env scala
/**
  * [practice/practice]
  *
  * Usage         : ./classic.scala (q) (arg1, arg2...)
  * 
  * Help          : ./classic.scala
  *
**/
import scala.collection.mutable.HashMap

/**
  * String has only unique characters (O(n))
  */
def unique(str: String):Boolean = {
  val m = new HashMap[Char, Boolean];
  for(c <- str) {
    if(m.contains(c)) {
      return false
    }
    m += c -> true
  }
  true
}
/**
  * String has only unique characters (functional - O(nlog(n)))
  */
def unique2(str: String):Boolean = {
  !str
    .sorted
    .zip(Array('\u0000') + str.sorted)
    .map( _ match { case(a, b)  => a == b } )
    .reduceLeft(_ || _)
}

/**
  * Are str1 and str2 anagrams? (O(n))
  */
def anagrams(str1:String, str2:String):Boolean = {
  if(str1.length() != str2.length())
    return false

  val m = new HashMap[Char, Int];
  for(c <- str1) {
    m += c -> (m.getOrElse(c, 0) + 1)
  }
  for(c <- str2) {
    if(!m.contains(c)) {
      return false
    }
    m += c -> (m.getOrElse(c, 0) - 1)
  }
  for(c <- str1) {
    if(m.get(c) != Some(0)) {
      return false
    }
  }
  true
}

/**
  * Are str1 and str2 anagrams? (functional - O(nlog(n)) - no additional space)
  */
def anagrams2(str1:String, str2:String):Boolean = {
  str1
    .sorted
    .zip(str2.sorted)
    .map { _ match { case(c1, c2) => c1 == c2 } }
    .reduceLeft(_ && _)
}

/**
  * Returns the transpose of a matrix
  */
def transpose(matrix:Array[Array[Int]]):Array[Array[Int]] = {
  (0 to matrix.length-1)
    .toArray
    .map((i:Int) => matrix.map(_(i)))
}

object Interview extends App {
  if(args.length == 0) {

    println(
      """
        | Unique: does string contain unique characters?
        |
        |   ./classic.scala unique string
        |   ./classic.scala unique2 string
        |
        | Anagrams: are strings permutations of one another?
        |
        |   ./classic.scala anagrams string1 string2
        |   ./classic.scala anagrams2 string1 string2
        |
        | Matrix operations: transpose
        |
        |   ./classic.scala transpose '1 & 2 && 3 & 4'
        |
      """.stripMargin)

  }
  else {
    def matrix_op(op:(Array[Array[Int]] => Array[Array[Int]])) = {
      op(args(1).split("\\s*&&\\s*").map(_.split("\\s*&\\s*").map(_.toInt))).deep.mkString("\n")
    }

    println(args(0) match {
      case "unique" => unique(args(1))

      case "unique2" => unique2(args(1))

      case "anagrams" => anagrams(args(1), args(2))

      case "anagrams2" => anagrams2(args(1), args(2))

      case "transpose" => matrix_op(transpose)
        
      case _ => throw new Exception("Method not implemented")
    })
  }

}

Interview.main(args)
