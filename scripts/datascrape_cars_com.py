#python3

import pandas as pd
import os
import sys

from urllib import request
from bs4 import BeautifulSoup
from pathlib import Path

def getCarReviews(car):

    try:
        carUrl = 'https://www.cars.com/research/{}/consumer-reviews/?nr=250'.format(car)
        rawPageData = request.urlopen(carUrl).read().decode()

        rawSoup = BeautifulSoup(rawPageData, "html5lib")
        reviews = rawSoup.findAll('span',{'itemprop':'description'})

        return [review.get_text() for review in reviews]
    except Exception as ex:
        print('Car not found: {}'.format(car))
        return []



def getCarNames():

    uniqueCars = set()

    with open('data.csv', 'r') as fileHandle:
        for line in fileHandle:
            carName = line.split(',')[:3]
            uniqueCars.add(carName[0].lower() + '-' + carName[1].replace(' ', '_').lower() + '-' + carName[2])

    return uniqueCars

def main():

    # Get all the car names formatted according to the website
    cars = getCarNames()

    # For each car get the reviews and store it
    for car in cars:
        print('Getting data for {}'.format(car))
        cardir = 'data/{}'.format(car.replace('-','_'))
        if not os.path.exists(cardir):
            os.makedirs(cardir)
            # Get the reviews and store them in files
            reviews = getCarReviews(car)
            if len(reviews) > 0:
                for idx, review in enumerate(reviews):
                    with open('{}/review_{}.dat'.format(cardir, idx+1),'w') as fileHandle:
                        fileHandle.write(review)

if __name__ == '__main__':
    main()
