#!/bin/sh

directivePath="js/directive/"
viewsPath="views/"


echo -e "\033[31m \n\n======Add a new directive======"
echo -en "\033[32mNew Directive name: "
read d_name

if [ ! -f ${directivePath}${d_name}".source.js" ]
	then
	echo -e "\033[32mset template path(after ${viewsPath}, end with /):"
	read t_path

	echo -e "\033[32m===================================="
	echo -e "\033[32mcreating directive file: "${directivePath}${d_name}".source.js ..."
	touch ${directivePath}${d_name}".source.js"
	echo -e "\033[32mcreating template file: "${viewsPath}${t_path}${d_name}".html ..."
	touch ${viewsPath}${t_path}${d_name}".html"
	echo -e "\033[32mDone!!!"
else
	echo -e "\033[31m The source file has exsited!"
fi


