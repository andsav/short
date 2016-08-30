
#!/usr/bin/env perl6
# -----------------------------------------------------------------
# [latex_tools/matrix2wolfram]
# 
# Purpose       : Converts matrix in latex format to Wolfram Alpha format 
#
# Author        : Andrei Savin
# -----------------------------------------------------------------

use v6;

my $latex = prompt("Enter matrix in latex format: ");

$latex ~~ s:g/\s//;
$latex = "\{\{$latex\}\}";
$latex ~~ s:g/\&/,/;
$latex ~~ s:g/\\\\/\}\{/;

say "Matrix in Wolfram Alpha format: $latex";
