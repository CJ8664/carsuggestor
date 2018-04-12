"""
This is a simple script that takes car
reviews from edmunds.com for analysis

Written by: Joshua Watson with code taken
from CSC495 excersizes and stack overflow
"""

#make_model_year/review_number.dat or.txt

import os
import csv
import requests
import re
from bs4 import BeautifulSoup

# Go through the csv and get each car
# Pass make, model and year into getinfo
with open('data.csv', 'rb') as csvfile:
    carreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in carreader:
        try:
            make = row[0].lower()
            model = row[1].replace(' ', '-').lower()
            year = row[2].lower()
            #skip header row
            if make == 'make':
                continue

            #Get professional review
            url = 'https://www.edmunds.com/' + make + '/' + model + '/' + year + '/review/'

            #Get consumer reviews
            url = 'https://www.edmunds.com/' + make + '/' + model + '/' + year + '/consumer-reviews/pg-1/?pagesize=50'
            print "Getting: ", url
            # Get the review page
            page = requests.get(url)
            # Get only the review, nothing else
            soup = BeautifulSoup(page.content, 'html.parser')
            text = soup.findAll('div',attrs={'class': None})
            reviews = re.findall(r'class="review-text">(.*?)</p>', str(text))
            i = 0
            for review in reviews:
                i += 1
                review = re.sub(r'<br/>', ' ', review)
                review = re.sub(r'\\n', ' ', review)
                review = re.sub(r'\\u', ' ', review)
                review = re.sub(r'\\r', ' ', review)
                #print review + '\n'
                if not os.path.isdir('cars/' + make + '_' + model + '_' + year):
                    os.mkdir('cars/' + make + '_' + model + '_' + year)
                reivew_file_name = os.path.join('cars/' + make + '_' + model + '_' + year + '/' + 'review_' + str(i) + '.txt')
                review_file = open(reivew_file_name, 'w')
                review_file.write(review)
                review_file.close()
        except Exception:
            # Retry if request fails
            print "Request failed.\nRetrying..."
            continue



