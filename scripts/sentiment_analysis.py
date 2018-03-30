#!/usr/local/bin/python3

"""Script to do sentiment analysis on review in multithreading."""

import os
import psycopg2 as pg
import threading

from textblob import TextBlob
from time import time

reviews = []
threadLock = threading.Lock()

db = 'carsuggest'
usr = ''
pasw = ''
host = 'localhost'
port = '5432'

reviewsCount = 0.0
processedReviews = 0

conn = None
cur = None


def analyzeSentiment(folderNum):
    """Get the review and perform sentiment analysis."""
    while True:

        carMake, carModel, reviewPath = getReview()

        if type(carMake) != Exception and carMake is not None:

            if folderNum == 0:
                carModel = '-'.join(carModel)
            else:
                carModel = carModel[0]

            if folderNum == 2 and (reviewPath == '' or reviewPath[-1] == '0'):
                continue

            carMake, carModel = carMake.lower(), carMake.lower()

            with open(reviewPath) as fileHandle:
                reviewText = fileHandle.read()
                reviewText = reviewText.replace('\'', '')
                reviewBlob = TextBlob(reviewText, classifier=None)
                reviewPolarity = reviewBlob.sentiment.polarity
                reviewSubjectivity = reviewBlob.sentiment.subjectivity
                insertQry = """INSERT INTO reviews2 (car_make, car_model,
                        review_polarity, review_subjectivity, review_text)
                        VALUES ('{}', '{}', {}, {}, '{}')""".format(
                    carMake, carModel, reviewPolarity, reviewSubjectivity,
                    reviewText)
                cur.execute(insertQry)
        else:
            break


def getReview():
    """Get the review text from the directory."""
    global reviews
    global threadLock
    global processedReviews
    threadLock.acquire()

    try:
        if processedReviews < reviewsCount:
            reviewPath = reviews.pop().split('/')
            carInfo = reviewPath[3].split('_')
            carMake = carInfo[0]
            carModel = carInfo[1]
            processedReviews += 1

            if processedReviews % 100 == 0:
                conn.commit()
            return carMake, carModel, '/'.join(reviewPath)
        else:
            return None, None, None
    except Exception as exp:
        return exp, None, None
    finally:
        threadLock.release()


def process(folderNum=0):
    """Get the list of review files and creates threads to process them."""
    global cur
    global reviews
    global reviewsCount
    global processedReviews

    reviewsCount = 0.0
    processedReviews = 0

    dataDir = '../data/{}'.format(folderNum)

    for dir in os.listdir(dataDir):
        if dir != '.DS_Store':
            for file in os.listdir(dataDir + '/' + dir):
                reviews.append(dataDir + '/' + dir + '/' + file)

    reviewsCount = len(reviews)
    print('Total reviews: {}'.format(reviewsCount))

    threadCount = 2
    threads = []

    cur = conn.cursor()

    startTime = time()

    for idx in range(threadCount):
        currThread = threading.Thread(target=analyzeSentiment,
                                      args=(folderNum, ))
        threads += currThread,
        currThread.start()
        currThread.join()

    endTime = time()

    print('Total time taken: {}'.format(endTime-startTime))

    conn.commit()


def main():
    """Process the reviews for three different website."""
    global conn

    conn = pg.connect(database=db, user=usr, password=pasw, host=host,
                      port=port)

    for folder in range(3):
        print('Processing folder #{}'.format(folder))
        process(folder)

    conn.close()

if __name__ == '__main__':
    main()
