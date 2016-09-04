#!/usr/bin/env perl6
# -----------------------------------------------------------------
# [latex_tools/matrix2rref]
# 
# Purpose        : Performs step-by-step Gauss-Jordan Elimination
#                  outputs everything in Latex format 
#
# Usage          : ./matrix2rref.pl '1 & 2 \\ 3 & 4'
#                : ./matrix2rred.pl
#
# Author         : Andrei Savin <andrei@andreisavin.com>
# -----------------------------------------------------------------
use v6;

#
# Input
#

my $latex = @*ARGS || prompt("Enter the matrix in latex form (eg. 1 & 2 \\\\ 3 & 4) ");
my @matrix = $latex.split(/\s*(\\)+s*/).map: { [.split(/\s*\&\s*/).map: { .trim }] };

#
# Row-reduce 
#

my @steps;

# $r1 <-> $r2
sub swap( @m, $r1, $r2 ) {
	return if $r1 == $r2;
	@m[$r1, $r2] = @m[$r2, $r1];
	@steps.push: { 
		'm' => @m.deepmap(*.clone), 
		'op' => "R_$r1 <-> R_$r2" 
	};
}
# $r *= $i
sub multiply( @m, $r, $i ) {
	@m[$r] »*=» $i;
	@steps.push: { 
		'm' => @m.deepmap(*.clone), 
		'op' => "R_$r \\times $i" 
	};
}
# $r1 += $i * $r2
sub add( @m, $r1, $r2, $i ) {
	@m[$r1] »+=» ( @m[$r2] »*» $i );
	@steps.push: { 
		'm' => @m.deepmap(*.clone), 
		'op' => "R_$r1 " 
		~ (($i < 0) ?? "- " !! "+") 
		~ ((abs($i) != 1) ?? " $i \times " !! "")  
		~ "R_$r2" 
	};
}

sub reduce(@m) {
	my ($rows_count, $cols_count) = +@m, +@m[0];
	my $col = 0;

	for @m.keys -> $row {
		return @m if $col >= $cols_count;
		my $i = $row;

		until @m[$i][$col] {
			++$i == $rows_count or next;
			$i = $row;
			return @m if ++$col == $cols_count;
		}

		swap( @m, $i, $row );
		multiply( @matrix, $row, 1/@matrix[$row][$col] );

		for @matrix.keys.grep( * != $row ) -> $scan {
			add(@matrix, $scan, $row, -1*@matrix[$scan][$col]);
		}

		$col++;
	}

	return @m;
}

my @initial = @matrix.deepmap(*.clone);
my @final = reduce(@matrix);

#
# Print
#
say '
\\begin{equation*}
\\begin{split}
\\begin{bmatrix}' 
~  (join ' \\\\ ', @initial.map: { .join(' & ') })
~'\\end{bmatrix}';

for @steps {
	say '& \\stackrel{' ~ $_{'op'} ~ '}{\\sim} \\begin{bmatrix}' 
	~ join(' \\\\ ', $_{'m'}.map: { .join(' & ') })
	~ '\\end{bmatrix}';
	say '\\\\' unless $_{'m'} eq @final;
}

say '\\end{split}
\\end{equation*}';


