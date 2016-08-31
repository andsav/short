#!/usr/bin/env perl6
# -----------------------------------------------------------------
# [latex_tools/matrix2wolfram]
# 
# Purpose       : Converts matrix in latex format to Wolfram Alpha format 
#
# Author        : Andrei Savin <andrei@andreisavin.com>
# -----------------------------------------------------------------

use v6;

my $latex = prompt("Enter matrix in latex format (e.g. \"1 & 2 \\\\ 3 & 4\") : ");

$latex ~~ s:g/\s//;
$latex = "\{\{$latex\}\}";
$latex ~~ s:g/\&/,/;
$latex ~~ s:g/\\\\/\}\,\{/;

say "Matrix in Wolfram Alpha format: $latex";
