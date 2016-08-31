#!/usr/bin/env perl6
# -----------------------------------------------------------------
# [latex_tools/matrix2rref]
# 
# Purpose       : Performas step-by-step Gauss-Jordan Elimination
# 		  outputs everything in beautiful Latex format 
#
# Usage		: ./matrix2rref.pl '1 & 2 \\ 3 & 4'
# 		: ./matrix2rred.pl
#
# Author        : Andrei Savin <andrei@andreisavin.com>
# -----------------------------------------------------------------
use v6;

my $latex = @*ARGS || prompt("Enter the matrix in latex form (eg. 1 & 2 \\\\ 3 & 4) ");
my @matrix = $latex.split(/\s*(\\)+s*/).map: { [.split(/\s*\&\s*/).map: { .trim }] };
my @steps;

#
# Gauss-Jordan Algorithm
#

# $r1 <-> $r2
sub swap( @M, $r1, $r2 ) {
    @M[$r1, $r2] = @M[$r2, $r1];
    @steps.push: { 'op' => 'swap', 'row1' => $r1, 'row2', $r2 };
}
# $r *= $i
sub multiply( @M, $r, $i ) {
    @M[$r] = @M[$r].map: { [ $_*$i ] };
    @steps.push: { 'op' => 'mult', 'row' => $r, 'i' => $i };
}
# $r1 += $s * $r2
sub add( @M, $r1, $r2, $s ) {
    @M[$r1] = @M[$r1].list »+» @M[$r2].map: { [ $_*$s ] };
    @steps.push: { 'op' => 'add', 'row1' => $r1, 'row2' => $r2, 's' => $s };
}

#swap(@matrix, 0, 1);
#multiply(@matrix, 0, 3);
#add(@matrix, 2, 0, 1/2);
#say @steps;

my ($rows_cout, $cols_count) = +@matrix, +@matrix[0];
my $col = 0;

for @matrix.keys -> $row {
    multiply( @matrix, $row, 1/@matrix[$row][$col]);
}

say @matrix;

###### @todo 
