#!/usr/bin/env scala
/**
  * [practic/interview]
  *
  * Purpose       : Cracking the code interview questions
  *
  * Usage         : ./interview.scala (q) (arg1, arg2...)
  *
  * Author        : Andrei Savin <andrei@andreisavin.com>
**/
import scala.collection.mutable.HashMap

/**
  * String has only unique characters
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
  * String has only unique characters (no additional space)
  */
def unique2(str: String):Boolean = {
  val lstr = str.toCharArray.sorted
  for(i <- 0 to str.length()-2) {
    if(lstr.charAt(i) == lstr.charAt(i+1)) {
      return false
    }
  }
  true
}

/**
  * Are str1 and str2 anagrams?
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
  * Rotate a matrix 90 degrees
  */
def rotate_matrix(Matrix:Array[Array[Int]]):Array[Array[Int]] = {

  Matrix
}

object Interview extends App {
  println(args(0) match {
    case "unique" => unique(args(1))

    case "unique2" => unique2(args(1))

    case "anagrams" => anagrams(args(1), args(2))

    case _ => throw new Exception("Method not implemented")
  })

}

Interview.main(args)