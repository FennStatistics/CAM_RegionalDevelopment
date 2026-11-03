## https://labjs.readthedocs.io/en/latest/learn/deploy/3c-jatos.html
## https://labjs.readthedocs.io/en/latest/learn/deploy/3-third-party.html


# sets the directory of location of this script as the current directory
setwd(dirname(rstudioapi::getSourceEditorContext()$path))

rm(list=ls(all=TRUE))
graphics.off()



############################################################################
# load packages, data
############################################################################
################
# packages
################
# This code relies on the pacman, tidyverse and jsonlite packages
require(pacman)
p_load('xlsx', 'jsonlite', 'stringr')



################
# data
################
dir()
items <- read.xlsx2(file = "items Koverola 2022.xlsx", sheetIndex = 1)


############################################################################
# to JSON
############################################################################
json_string_Label <- toJSON(x = items$Number)
json_string_Question <- toJSON(x = items$Question)

json_string_Label
json_string_Question
