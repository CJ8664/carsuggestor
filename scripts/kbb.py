from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
import csv
import sys
import os

driver = webdriver.Chrome()
with open('unique_cars.csv') as csvdata:
    reader = csv.reader(csvdata)
    for row in reader:
        make = row[0].replace(" ", "-")
        model = row[1].replace(" ", "-")
        url = 'http://www.kbb.com/{}/{}'.format(make, model)
        driver.get(url)
        time.sleep(5)
        try:
            reviews = driver.find_elements_by_class_name('review-text')
            directory = '/Users/savannaharnette/Desktop/car_data/' + make + "_" + model
            os.makedirs(directory)
            for review in reviews:
                index = 0
                filename = directory + "/" + str(index)
                print(review.text, file = open(filename, "a"))
                index += 1
        except:
            print(sys.exc_info())
            continue
driver.close()
