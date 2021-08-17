#! /usr/bin/bash

# The above shebang line is the absolute path to whatever interpreter
# should be used to run this script. This can be verified using `which bash`.

################################################

# Echo command, like printing
# quotes unnecessary but considered good practice
echo "Hello world!"

# -e flag to recognise escape characters
echo -e "There is a \n newline here"

# place expression in parantheses to evaluate
echo "The date is: $(date +%D)"


################################################

# Variables

# lowercase by convention
# Letters, numbers, underscores
# Global by default, within functions you can prefix with the `local` keyword
name="Nick"
echo "This device belongs to $name" # $ sign to use variables

################################################

# User input

# -p flag signifies we wish to prompt with a string
# -sp flag for secret prompt: whatever user types in will not be reflected in console
read -p "Enter your name: " username # input read will be stored in this variable
echo "Hello $username, nice to meet you!"

################################################

# Conditionals

# if/elif/else syntax
if [ "$username" == "Nick" ]
then
    echo "What a cool guy."
elif [ "$username" == "Jasper" ]
then
    echo "kanina chibai honggan la"
else
    echo "Not as cool as Nick."
fi

str1=""

if [ "$str1" ]
then
    echo "$str1 is not null"
fi

if [ -z "$str1" ]
then
    echo "$str1 has no value"
fi

################################################

# Comparisons

# val1 -eq val2 checks EQuality
# val1 -ne val2 checks if Not Equal
# val1 -gt val2 checks if val1 Greater Than val2
# val1 -ge val2 checks if val1 Greater or Equal to val2
# val1 -lt val2 checks if val1 Less Than val2
# val1 -le val2 checks if val1 Less or Equal to val2

################################################

# Files

# -d checks if file is directory
# -e checks if file exists
# -f checks if provided string is a file
# -g checks if group id is set on a file
# -r checks if file is readable
# -s checks if file has non-zero size
# -u checks if user id is set on file
# -w checks if file is writable
# -x checks if file is executable

file="bashBasics.sh"
if [ -f "$file" ]
then
    echo "$file is a file"
fi

################################################

# Case statement

# quite strange syntax. 
read -p "Are you over 18?" answer
case "$answer" in
    [yY] | [yY][eE][sS]) # regex
        echo "You can drink!"
        ;;
    [nN] | [nN][oO])
        echo "Sorry, too young."
        ;;
    *) # default
        echo "Please enter y/yes or n/no"
        ;;
esac

################################################

# For loop - simple
names="Adam Brad Charles Dave"
for name in $names
    do 
        echo "Hello $name"
done

# prints values in a range
# start..end..increment
for i in {0..20..2}
    do
        echo $i 
done

# Advanced application - renaming files
# FILES=$(ls *.txt)
# NEW="new"
# for FILE in $FILES
#     do
#         echo "Remaining $FILE to new-$FILE"
#         mv $FILE $NEW-$FILE
# done

################################################

# While loop - printing each line in a file
line=1
while read -r current_line
    do
        echo "$line: $current_line"
        ((line++)) # double parentheses allow for C-style syntax
done < "./new-new-1.txt"

# there is also an until loop which executes a code block when a condition is false
# and keeps going until it becomes true

################################################

# File redirection 

# < means take the content of this file and use in this command
# > will write output to this file OVERWRITING EXISTING CONTENT
# >> will APPEND output to this file

################################################

# Functions

function sayHello() {
    echo "Hello World!"
}

# calling a function without parameters is just like this
sayHello

# Function with parameters
function greet() {
    echo "Hello, I am $1 and I am $2"
}

# example of using positional parameters
# bash will detect these 2 varaibles above and substitue accordingly
greet "Nick" "21"

# note: $0 will print name of program as in command line
# in this case ./bashBasics.sh

################################################

# Heredoc

# - allows multiline strings to be passed into commands
# - special redirection operator << must be used
# - this can be redirected to a file if > is placed after the delimiter
cat << END 
The current working directory is: $(pwd)
You are logged in as: $(whoami)
END

################################################

# Regex comparison
pattern="^[0-9]{8}$"
regexTest=12345678

if [[ $regexTest =~ $pattern ]] # regex comparison operator
then
    echo "valid pattern"
else
    echo "invalid pattern"
fi

################################################

# IFS or delimiter
# say we want to prompt user to enter arguments separated by anything other than space

OIFS="$IFS" # store the original IFS value
IFS="," # change the delimiter to comma

read -p "Enter 2 numbers separated by a comma: " num1 num2
echo $(($num1 + $num2))

IFS=$OIFS # change it back in case we fuck up anything in the code

################################################

# Parameter expansion

# basic usage, think fstrings 
myName="Nick"
echo "${myName}'s toy"

# replacing substrings
samp_string="The dog climbed the tree"
echo "${samp_string//dog/cat}" # replaces dog with cat

# printing default values
echo "I am ${myName:=Nick}" # if myName is null, it is assigned and substitued
# if :- is used instead, value will be substituted but not assigned

# obtaining string length
echo "String length: ${#samp_string}"

# string slicing
echo "${samp_string:4}" # dog climbed the tree
echo "${samp_string:4:3}" # dog, note second number denotes length of substring to take
echo "${samp_string#*The }" # dog climbed the tree

################################################

# Arrays

# bash only supports one-dimensional arrays
# note these will be delimited by the IFS as usual (default: space)
some_nums=(1 3 5 9 21)
echo "first number: ${some_nums[0]}" # 1

some_nums[5]=30 # appending an element
some_nums+=(45 49) # appending multiple elements

# using * notation will return all array elements as a SINGLE WORD RESULT
# using @ notation will return individual array elements, hence useful in for loops

for keys in "${!some_nums[@]}" # ! means bang notation, allows to access keys/indices
    do 
        echo $keys
done

echo "some_nums contains ${#some_nums[*]} elements"

unset 'some_nums[1]' # delete single element
unset some_nums # delete entire array

################################################

# grep for finding strings in other strings/files/etc

# usage: grep (search key) (where to search)
# -l flag ignores case
# -n flag shows the line number where it is found
# -c flag counts the number of matches
# -v flag shows all lines WITHOUT the search key

################################################
