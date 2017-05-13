#!/usr/bin/env scala

import scala.collection.immutable.HashMap
import scala.util.matching.Regex
import scala.io.Source

def parseJSONLine(str:String):Map[String, String] = str match {
    case "" => new HashMap[String, String]
    case str => str.substring(2, str.length-2)                           // Remove brackets and " from ends
                    .split("\",\"").map( _.split("\":\"") )              // Split
                    .map( {                                              // Convert to Map
                        case Array(a,b) => (a, b.toLowerCase)
                        case Array(a) => (a, "")
                    } ).toMap
}

val listings:Array[Map[String, Array[String]]] = Source.fromFile("listings.txt").getLines.toArray.map( {
    case "" => new HashMap[String, Array[String]]
    case str => {
        val parsed = parseJSONLine(str)
        Map(
            "str" -> Array(str),
            "product" -> parsed("title")
                        .replaceAll("\\s(for|pour|für)\\s(.+)$", "").trim   // The actual item comes before (for ***), include French and German
                        .replaceAll("\\s(with|-)\\s(.+)$", "").trim         // (with *** or - ***) only provides description - Strip
                        .replaceAll("\\((.+)\\)", "").trim                  // Elements in parenthesis only provide description - Strip
                        .split("\\s"),                                      // Split words in remaining product title
            "manufacturer" -> parsed("manufacturer").split("\\s")
        )
    }
})

val products:Array[Map[String, Array[String]]] = Source.fromFile("products.txt").getLines.toArray.map( {
    case "" => new HashMap[String, Array[String]]
    case str => {
        val parsed = parseJSONLine(str)
        Map(
            "str" -> Array(str),
            "manufacturer" -> Array(parsed("manufacturer")),
            "product_name" -> Array(parsed("product_name")),
            "model" -> parsed("model").split("\\s")
        )
    }
})

val result:Array[Map[String, Array[String]]] = products.map({
    case product => {
        val filter = (listing:Map[String, Array[String]]) => (
                ((listing("manufacturer") contains product("manufacturer")(0))                       // The product manufacturer is in the listing manufacturer
                        || listing("product")(0) == product("manufacturer")(0))                      //      or the first word in the listing title is the product manufacturer
                        && !(product("model").map(listing("product") contains _) contains false))    // All the words in the product model are in the listing title

        Map(
            "product_name" -> product("product_name"),
            "listings" -> listings.filter(filter).map(_("str")(0))
        )
    }
})

result.foreach({
    case res => {
        println("{\"product_name\":\""
                + res("product_name")(0)
                + "\",\"listings\":["
                + (if(res("listings").length != 0) res("listings").mkString(",") else "")
                + "]}")
    }
})