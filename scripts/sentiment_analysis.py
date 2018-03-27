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

conn = pg.connect(database=db, user=usr, password=pasw, host=host, port=port)
cur = None


def analyzeSentiment():
    """Get the review and perform sentiment analysis."""
    while True:
        carMake, carModel, reviewPath = getReview()
        # print(carMake, carModel, reviewPath)
        if type(carMake) != Exception and carMake is not None:
            # carModel = '-'.join(carModel) keep for Chirag
            if reviewPath == '' or reviewPath[-1] == '0':
                continue
            carModel = carModel[0]
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
            carInfo = reviewPath[7].split('_')
            carMake = carInfo[0]
            carModel = carInfo[1]
            processedReviews += 1
            # print('Progress: {}'
            #       .format(round(processedReviews*100/reviewsCount, 2)))
            if processedReviews % 100 == 0:
                conn.commit()
            return carMake, carModel, '/'.join(reviewPath)
        else:
            return None, None, None
    except Exception as exp:
        return exp, None, None
    finally:
        threadLock.release()


def main():
    """Get the list of review files and creates threads to process them."""
    global cur
    global reviews
    global reviewsCount

    # dataDir = '/Users/chiragjain/Documents/DDDM/project/data1' Josh
    # dataDir = '/Users/chiragjain/Documents/DDDM/project/data' Chirag
    dataDir = '/Users/chiragjain/Documents/DDDM/project/data2'

    for dir in os.listdir(dataDir):
        if dir != '.DS_Store':
            for file in os.listdir(dataDir + '/' + dir):
                reviews.append(dataDir + '/' + dir + '/' + file)

    reviewsCount = len(reviews)
    print('Total reviews: {}'.format(reviewsCount))

    threadCount = 20
    threads = []

    cur = conn.cursor()

    startTime = time()

    for idx in range(threadCount):
        currThread = threading.Thread(target=analyzeSentiment)
        threads += currThread,
        currThread.start()
        currThread.join()

    endTime = time()

    print('Total time taken: {}'.format(endTime-startTime))

    conn.commit()
    conn.close()

if __name__ == '__main__':
    main()
