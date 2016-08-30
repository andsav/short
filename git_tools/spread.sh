#!/bin/bash
# -----------------------------------------------------------------
# [git_tools/spread]
# 
# Purpose       : Modifies git history spreading contributions evenly accross time
#
# Usage         : Run inside a git repository, then use 'git push --force'
#		  ./spread.sh (no arguments) 
#			will preserve current first and last date
#	          ./spread.sh TIMESTAMP	
#			will set the first commit's date to TIMESTAMP
#		  ./spread.sh TIMESTAMP1 TIMESTAMP2
#			will set the interval of commits between the TIMESTAMPs
#                 The process might take a long time, especially on large repos
#
# Author        : Andrei Savin
# -----------------------------------------------------------------


changeDate() {	
    git filter-branch -f --env-filter \
      "if test \$GIT_COMMIT = $1
        then
          export GIT_AUTHOR_DATE="$2"
          export GIT_COMMITTER_DATE="$2"
      fi" && rm -fr "$(git rev-parse --git-dir)/refs/original/"    

}

first_commit="$(git log --pretty=format:"%H" | tail -1 | head -1)"
last_commit="$(git rev-parse HEAD)"

first_commit_date="$(git show -s --format=%ct $first_commit)"
last_commit_date="$(git show -s --format=%ct)"

# If interval is specified, set it
if [ $# -gt 0 ]
then
    echo "Setting first commit to $1..."
    changeDate $first_commit $1 > /dev/null
    first_commit_date=$1
    if [ $# -eq 2 ]
    then
        echo "Setting last commit to $2..."
        changeDate $last_commit $2 > /dev/null
        last_commit_date=$2
    fi
fi

commits_count="$(git rev-list HEAD --count)"

# The even interval to be added
delta=$((($last_commit_date-$first_commit_date)/$commits_count))
half=$(($delta/2))


I=1
while [ $I -lt $commits_count ]; do
    echo "Rewriting commit $I/$commits_count..."

    # Add a random offset between -half and half to make it seem more human
    rand=$(( (($RANDOM * $RANDOM) % $delta) - $half ))

    let I=I+1
    this_commit="$(git log --pretty=format:"%H" | tail -${I} | head -1)"
    this_date="$(( $first_commit_date + ($delta * I) + rand  ))"

    changeDate $this_commit $this_date > /dev/null
done
